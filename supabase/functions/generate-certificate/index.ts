// UTAMV — Generador de certificados con PDF institucional, QR y BlockUTAMV
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { PDFDocument, StandardFonts, rgb } from "https://esm.sh/pdf-lib@1.17.1";
import QRCode from "https://esm.sh/qrcode@1.5.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// SHA-256 helper
async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userData.user.id;

    const { courseId, finalScore = 100 } = await req.json();
    if (!courseId) {
      return new Response(JSON.stringify({ error: "courseId requerido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Service client para escribir certificate + chain
    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Verificar enrollment activo
    const { data: enrollment } = await admin
      .from("enrollments")
      .select("id, status")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .eq("status", "active")
      .maybeSingle();

    if (!enrollment) {
      return new Response(
        JSON.stringify({ error: "No estás inscrito en este curso" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Obtener course + profile
    const [{ data: course }, { data: profile }] = await Promise.all([
      admin.from("courses").select("title, level, hours, category").eq("id", courseId).single(),
      admin.from("profiles").select("full_name, display_name").eq("user_id", userId).single(),
    ]);

    if (!course) {
      return new Response(JSON.stringify({ error: "Curso no encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verificar si ya existe certificado
    const { data: existing } = await admin
      .from("certificates")
      .select("id, certificate_number, pdf_url, blockchain_hash, verification_url")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (existing?.pdf_url) {
      return new Response(
        JSON.stringify({
          alreadyIssued: true,
          certificate: existing,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Generar número de certificado
    const { data: certNum } = await admin.rpc("generate_certificate_number");
    const certificateNumber = certNum as string;

    const holderName = profile?.full_name || profile?.display_name || "Estudiante UTAMV";
    const issuedAt = new Date();
    const issuedISO = issuedAt.toISOString();

    // ─── BlockUTAMV: encadenar hash ───
    const { data: lastBlock } = await admin.rpc("get_last_block");
    const prevHash =
      (lastBlock as any)?.[0]?.block_hash ??
      "0000000000000000000000000000000000000000000000000000000000000000";
    const blockIndex = ((lastBlock as any)?.[0]?.block_index ?? 0) + 1;

    const dataPayload = JSON.stringify({
      certificateNumber,
      holderName,
      courseTitle: course.title,
      hours: course.hours,
      finalScore,
      issuedAt: issuedISO,
      institution: "UTAMV Campus Online",
    });
    const dataHash = await sha256(dataPayload);
    const nonce = crypto.randomUUID();
    const blockHash = await sha256(`${blockIndex}|${prevHash}|${dataHash}|${nonce}`);

    // URL de verificación pública
    const verificationUrl = `https://utamv-campus-online.lovable.app/certificados?n=${encodeURIComponent(certificateNumber)}`;

    // QR
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 400,
      margin: 1,
      color: { dark: "#0a1628", light: "#ffffff" },
    });
    const qrBytes = Uint8Array.from(
      atob(qrDataUrl.split(",")[1]),
      (c) => c.charCodeAt(0),
    );

    // ─── PDF institucional ───
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 horizontal
    const { width, height } = page.getSize();

    const fontTitle = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontBody = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

    // Colores institucionales
    const navy = rgb(0.04, 0.09, 0.16);
    const platinum = rgb(0.83, 0.84, 0.86);
    const platinumBright = rgb(0.93, 0.94, 0.95);
    const muted = rgb(0.55, 0.58, 0.62);

    // Fondo
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.99, 0.99, 0.99) });

    // Marco platino
    page.drawRectangle({
      x: 30, y: 30, width: width - 60, height: height - 60,
      borderColor: platinum, borderWidth: 2,
    });
    page.drawRectangle({
      x: 38, y: 38, width: width - 76, height: height - 76,
      borderColor: navy, borderWidth: 0.6,
    });

    // Banda superior
    page.drawRectangle({ x: 30, y: height - 95, width: width - 60, height: 65, color: navy });

    // Título institucional
    page.drawText("UTAMV CAMPUS ONLINE", {
      x: width / 2 - fontTitle.widthOfTextAtSize("UTAMV CAMPUS ONLINE", 18) / 2,
      y: height - 60, size: 18, font: fontTitle, color: platinumBright,
    });
    page.drawText("Universidad de Tecnología Avanzada, Marketing y Versatilidad", {
      x: width / 2 - fontBody.widthOfTextAtSize("Universidad de Tecnología Avanzada, Marketing y Versatilidad", 9) / 2,
      y: height - 78, size: 9, font: fontBody, color: platinum,
    });

    // "Certificado de Culminación"
    page.drawText("CERTIFICADO DE CULMINACIÓN ACADÉMICA", {
      x: width / 2 - fontTitle.widthOfTextAtSize("CERTIFICADO DE CULMINACIÓN ACADÉMICA", 14) / 2,
      y: height - 130, size: 14, font: fontTitle, color: navy,
    });

    // Otorgado a
    page.drawText("Se otorga el presente a", {
      x: width / 2 - fontBody.widthOfTextAtSize("Se otorga el presente a", 11) / 2,
      y: height - 175, size: 11, font: fontBody, color: muted,
    });

    // Nombre del titular
    const nameSize = 28;
    page.drawText(holderName.toUpperCase(), {
      x: width / 2 - fontTitle.widthOfTextAtSize(holderName.toUpperCase(), nameSize) / 2,
      y: height - 215, size: nameSize, font: fontTitle, color: navy,
    });
    // Línea decorativa bajo nombre
    page.drawLine({
      start: { x: width / 2 - 200, y: height - 225 },
      end: { x: width / 2 + 200, y: height - 225 },
      thickness: 0.8, color: platinum,
    });

    // Por concluir satisfactoriamente
    page.drawText("Por concluir satisfactoriamente el programa académico", {
      x: width / 2 - fontBody.widthOfTextAtSize("Por concluir satisfactoriamente el programa académico", 11) / 2,
      y: height - 250, size: 11, font: fontBody, color: muted,
    });

    // Título del curso
    const courseTitle = course.title;
    page.drawText(`"${courseTitle}"`, {
      x: width / 2 - fontTitle.widthOfTextAtSize(`"${courseTitle}"`, 16) / 2,
      y: height - 280, size: 16, font: fontTitle, color: navy,
    });

    // Detalles
    const details = `${course.level || "Programa"} · ${course.hours || 0} horas académicas · Calificación final: ${finalScore}/100`;
    page.drawText(details, {
      x: width / 2 - fontBody.widthOfTextAtSize(details, 10) / 2,
      y: height - 305, size: 10, font: fontBody, color: muted,
    });

    // Fecha
    const fechaStr = issuedAt.toLocaleDateString("es-MX", {
      day: "numeric", month: "long", year: "numeric",
    });
    page.drawText(`Expedido el ${fechaStr}`, {
      x: width / 2 - fontBody.widthOfTextAtSize(`Expedido el ${fechaStr}`, 10) / 2,
      y: height - 335, size: 10, font: fontBody, color: navy,
    });

    // QR + verificación (esquina inferior izquierda)
    const qrImage = await pdfDoc.embedPng(qrBytes);
    page.drawImage(qrImage, { x: 60, y: 60, width: 90, height: 90 });
    page.drawText("Verificación pública", {
      x: 60, y: 50, size: 8, font: fontBody, color: navy,
    });
    page.drawText("Escanea el código QR", {
      x: 60, y: 40, size: 7, font: fontBody, color: muted,
    });

    // Firma (centro inferior)
    page.drawLine({
      start: { x: width / 2 - 90, y: 100 },
      end: { x: width / 2 + 90, y: 100 },
      thickness: 0.6, color: navy,
    });
    page.drawText("Rectoría Académica UTAMV", {
      x: width / 2 - fontBody.widthOfTextAtSize("Rectoría Académica UTAMV", 9) / 2,
      y: 85, size: 9, font: fontBody, color: navy,
    });
    page.drawText("Campus Online · 2026", {
      x: width / 2 - fontBody.widthOfTextAtSize("Campus Online · 2026", 8) / 2,
      y: 73, size: 8, font: fontBody, color: muted,
    });

    // Datos BlockUTAMV (esquina inferior derecha)
    const rightX = width - 320;
    page.drawText("BLOCKUTAMV · Cadena institucional", {
      x: rightX, y: 130, size: 8, font: fontTitle, color: navy,
    });
    page.drawText(`No. Cert: ${certificateNumber}`, {
      x: rightX, y: 115, size: 7, font: fontMono, color: navy,
    });
    page.drawText(`Bloque #${blockIndex}`, {
      x: rightX, y: 103, size: 7, font: fontMono, color: muted,
    });
    page.drawText(`Hash: ${blockHash.substring(0, 48)}...`, {
      x: rightX, y: 91, size: 6.5, font: fontMono, color: muted,
    });
    page.drawText(`Prev: ${prevHash.substring(0, 48)}...`, {
      x: rightX, y: 79, size: 6.5, font: fontMono, color: muted,
    });
    page.drawText("Estudios sin reconocimiento de validez oficial · Certificado institucional privado UTAMV", {
      x: 60, y: height - 555, size: 6.5, font: fontBody, color: muted,
    });

    const pdfBytes = await pdfDoc.save();

    // Subir a Storage
    const filePath = `${userId}/${certificateNumber}.pdf`;
    const { error: uploadErr } = await admin.storage
      .from("certificates")
      .upload(filePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });
    if (uploadErr) throw uploadErr;

    const { data: urlData } = admin.storage.from("certificates").getPublicUrl(filePath);
    const pdfUrl = urlData.publicUrl;

    // Insertar en certificates
    const { data: certRow, error: certErr } = await admin
      .from("certificates")
      .insert({
        user_id: userId,
        course_id: courseId,
        certificate_number: certificateNumber,
        blockchain_hash: blockHash,
        qr_code_url: qrDataUrl,
        verification_url: verificationUrl,
        pdf_url: pdfUrl,
        final_score: finalScore,
        hours_completed: course.hours,
        metadata: { blockIndex, previousHash: prevHash, dataHash, nonce },
      })
      .select()
      .single();
    if (certErr) throw certErr;

    // Insertar bloque en cadena
    await admin.from("block_utamv_chain").insert({
      block_index: blockIndex,
      certificate_id: certRow.id,
      certificate_number: certificateNumber,
      user_id: userId,
      course_id: courseId,
      data_hash: dataHash,
      previous_hash: prevHash,
      block_hash: blockHash,
      nonce,
    });

    return new Response(
      JSON.stringify({
        success: true,
        certificate: {
          id: certRow.id,
          certificate_number: certificateNumber,
          pdf_url: pdfUrl,
          verification_url: verificationUrl,
          blockchain_hash: blockHash,
          block_index: blockIndex,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("generate-certificate error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

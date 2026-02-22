import React from 'react';
import { Check, Star, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Membresía Profesional",
    price: "29", // 15% más accesible que el promedio de $35 USD en Latam
    description: "Acceso total a las 7 federaciones de conocimiento UTAMV.",
    features: [
      "Clases con Edwin Oswaldo Castillo y Renata Jazmín",
      "Guía académica 24/7 con AI Isabella",
      "Certificación verificada en Blockchain",
      "Acceso a laboratorios de Marketing Digital",
      "Networking exclusivo en Real del Monte (Virtual)",
    ],
    highlight: false,
    cta: "Comenzar mi Liderazgo"
  },
  {
    name: "Elite Visionary",
    price: "49", // Valor estratégico por debajo de los planes Premium globales
    description: "Para líderes que no aceptan respuestas negativas.",
    features: [
      "Todo lo anterior + Mentoría directa",
      "Acceso al TAMV Metaverso",
      "Estrategias de Órbita Digital (Renata Jazmín)",
      "Proyectos reales con la metodología de Edwin Castillo",
      "Acceso preferente a eventos internacionales",
    ],
    highlight: true,
    cta: "Vivir el Futuro Ahora"
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#000033] bg-gradient-to-br from-[#000033] via-[#05054d] to-[#00001a] text-white py-20 px-4 overflow-hidden relative">
      {/* Efectos de Destellos Dorados y Plata */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping shadow-[0_0_15px_#D4AF37]"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#E5E4E2] rounded-full animate-pulse shadow-[0_0_15px_#E5E4E2]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-[#D4AF37] rounded-full animate-ping delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest">Precios NextGen</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-[#F0F2F3]">
            Inversión en tu <span className="text-[#D4AF37]">Legado</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto italic">
            "No imitamos el futuro. Nosotros somos el futuro."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`relative border-2 ${plan.highlight ? 'border-[#D4AF37] scale-105 bg-[#000044]' : 'border-silver-platino/30 bg-[#000033]'} backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-xs font-black px-4 py-1 rounded-full uppercase">
                  Recomendación Directiva
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-[#F0F2F3]">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-[#F0F2F3]">${plan.price}</span>
                  <span className="ml-1 text-xl text-gray-400">/mes</span>
                </div>
                <p className="text-[#D4AF37] text-xs font-semibold mt-2">Garantía de valor 15% más accesible que la competencia.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="mr-2 h-5 w-5 text-[#D4AF37]" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full py-6 text-lg font-bold transition-all ${plan.highlight ? 'bg-[#D4AF37] hover:bg-[#b8962f] text-black' : 'bg-white/10 hover:bg-white/20 text-[#F0F2F3]'}`}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="text-[#D4AF37]" /> Seguridad Académica Verificada por las 7 Federaciones TAMV.
          </p>
        </div>
      </div>
    </div>
  );
}

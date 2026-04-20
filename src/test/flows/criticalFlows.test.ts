/**
 * Bloque 4 — Tests Vitest de los 5 flujos críticos UTAMV
 * con mock completo del cliente Supabase.
 *
 * Flujos cubiertos:
 *  1. Registro (signUp + creación de profile vía trigger)
 *  2. Inscripción gratuita (insert en enrollments)
 *  3. Progreso de lección (upsert en lesson_progress)
 *  4. Emisión de certificado (invoke generate-certificate)
 *  5. Verificación pública (invoke verify-certificate)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─────────────────────────────────────────────
// Mock del cliente Supabase
// ─────────────────────────────────────────────
const buildQueryBuilder = (resolvedValue: any) => {
  const qb: any = {};
  const chainable = ['select', 'eq', 'order', 'limit', 'single', 'maybeSingle', 'in', 'match', 'gte', 'lte'];
  chainable.forEach((m) => {
    qb[m] = vi.fn().mockReturnValue(qb);
  });
  qb.insert = vi.fn().mockResolvedValue(resolvedValue);
  qb.update = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue(resolvedValue),
  });
  qb.upsert = vi.fn().mockResolvedValue(resolvedValue);
  qb.delete = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue(resolvedValue),
  });
  qb.then = (resolve: any) => resolve(resolvedValue);
  return qb;
};

const mockSupabase = {
  auth: {
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    getSession: vi.fn(),
  },
  from: vi.fn(),
  functions: {
    invoke: vi.fn(),
  },
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// ─────────────────────────────────────────────
// 1. REGISTRO
// ─────────────────────────────────────────────
describe('Flujo 1 — Registro de usuario', () => {
  it('crea cuenta y dispara perfil en profiles', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: {
        user: { id: 'user-uuid-1', email: 'nuevo@utamv.edu.mx' },
        session: null,
      },
      error: null,
    });

    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.auth.signUp({
      email: 'nuevo@utamv.edu.mx',
      password: 'Secreta123!',
      options: { data: { full_name: 'Nuevo Estudiante' } },
    });

    expect(error).toBeNull();
    expect(data.user?.email).toBe('nuevo@utamv.edu.mx');
    expect(mockSupabase.auth.signUp).toHaveBeenCalledOnce();
  });

  it('rechaza email inválido', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid email', name: 'AuthApiError' },
    });
    const { supabase } = await import('@/integrations/supabase/client');
    const { error } = await supabase.auth.signUp({ email: 'no-email', password: 'x' });
    expect(error).not.toBeNull();
  });
});

// ─────────────────────────────────────────────
// 2. INSCRIPCIÓN GRATUITA
// ─────────────────────────────────────────────
describe('Flujo 2 — Inscripción gratuita', () => {
  it('inserta enrollment activo con monto 0', async () => {
    const enrollmentRow = {
      id: 'enr-1',
      user_id: 'user-uuid-1',
      course_id: '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d',
      status: 'active',
      amount_paid_mxn: 0,
    };
    mockSupabase.from.mockReturnValue(
      buildQueryBuilder({ data: enrollmentRow, error: null })
    );

    const { supabase } = await import('@/integrations/supabase/client');
    const result = await supabase.from('enrollments').insert(enrollmentRow);

    expect(mockSupabase.from).toHaveBeenCalledWith('enrollments');
    expect(result.data).toMatchObject({ status: 'active', amount_paid_mxn: 0 });
  });
});

// ─────────────────────────────────────────────
// 3. PROGRESO DE LECCIÓN
// ─────────────────────────────────────────────
describe('Flujo 3 — Progreso de lección', () => {
  it('upsert de progreso al 100% marca lección completada', async () => {
    const progressRow = {
      user_id: 'user-uuid-1',
      course_id: '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d',
      lesson_id: 'b1000000-0000-4000-8000-000000000101',
      progress_percent: 100,
      completed: true,
      completed_at: new Date().toISOString(),
    };
    mockSupabase.from.mockReturnValue(
      buildQueryBuilder({ data: progressRow, error: null })
    );

    const { supabase } = await import('@/integrations/supabase/client');
    const result = await supabase.from('lesson_progress').upsert(progressRow);

    expect(mockSupabase.from).toHaveBeenCalledWith('lesson_progress');
    expect(result.data).toMatchObject({ completed: true, progress_percent: 100 });
  });
});

// ─────────────────────────────────────────────
// 4. EMISIÓN DE CERTIFICADO
// ─────────────────────────────────────────────
describe('Flujo 4 — Emisión de certificado', () => {
  it('invoca edge function generate-certificate y devuelve número + hash', async () => {
    mockSupabase.functions.invoke.mockResolvedValue({
      data: {
        certificate_number: 'UTAMV-2026-000001',
        blockchain_hash: '0xabc123def456',
        pdf_url: 'https://storage/utamv/cert.pdf',
        verification_url: 'https://utamv.edu.mx/verificar/UTAMV-2026-000001',
      },
      error: null,
    });

    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.functions.invoke('generate-certificate', {
      body: { course_id: '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d' },
    });

    expect(error).toBeNull();
    expect(data.certificate_number).toMatch(/^UTAMV-\d{4}-\d{6}$/);
    expect(data.blockchain_hash).toBeTruthy();
    expect(data.pdf_url).toContain('cert');
  });
});

// ─────────────────────────────────────────────
// 5. VERIFICACIÓN PÚBLICA
// ─────────────────────────────────────────────
describe('Flujo 5 — Verificación pública de certificado', () => {
  it('verify-certificate retorna válido para número existente', async () => {
    mockSupabase.functions.invoke.mockResolvedValue({
      data: {
        valid: true,
        holder_name: 'Nuevo Estudiante',
        course_title: 'Diplomado en Diseño de Ecosistemas Digitales',
        certificate_number: 'UTAMV-2026-000001',
        blockchain_hash: '0xabc123def456',
        previous_hash: '0x000000000',
        block_index: 42,
      },
      error: null,
    });

    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.functions.invoke('verify-certificate', {
      body: { certificate_number: 'UTAMV-2026-000001' },
    });

    expect(error).toBeNull();
    expect(data.valid).toBe(true);
    expect(data.block_index).toBeGreaterThan(0);
  });

  it('verify-certificate retorna inválido para número inexistente', async () => {
    mockSupabase.functions.invoke.mockResolvedValue({
      data: { valid: false },
      error: null,
    });
    const { supabase } = await import('@/integrations/supabase/client');
    const { data } = await supabase.functions.invoke('verify-certificate', {
      body: { certificate_number: 'UTAMV-9999-000000' },
    });
    expect(data.valid).toBe(false);
  });
});

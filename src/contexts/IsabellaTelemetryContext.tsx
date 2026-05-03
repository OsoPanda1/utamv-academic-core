import React, { createContext, useContext, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TelemetryContextType {
  trackEvent: (action_type: string, module: string, payload?: Record<string, unknown>) => Promise<void>;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const IsabellaTelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackEvent = useCallback(async (action_type: string, module: string, payload = {}) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) return;

      const { error } = await supabase
        .from('tamvcrums_logs')
        .insert([
          {
            federation_id: session.session.user.id,
            emotional_state: { action_type, module, ...payload },
          },
        ]);

      if (error) throw error;
    } catch (err) {
      console.error('[TAMV Kernel Error] Fallo en la telemetría de Isabella:', err);
    }
  }, []);

  return <TelemetryContext.Provider value={{ trackEvent }}>{children}</TelemetryContext.Provider>;
};

export const useIsabellaTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useIsabellaTelemetry debe usarse dentro de un IsabellaTelemetryProvider');
  }
  return context;
};

'use client';

import { useCallback, useState } from 'react';

export type FormspreeStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseFormspreeResult {
  status: FormspreeStatus;
  error: string | null;
  submit: (payload: Record<string, FormDataEntryValue | string>) => Promise<boolean>;
  reset: () => void;
}

export function useFormspree(): UseFormspreeResult {
  const [status, setStatus] = useState<FormspreeStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  const submit = useCallback(async (payload: Record<string, FormDataEntryValue | string>) => {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      const message = 'NEXT_PUBLIC_FORMSPREE_ENDPOINT is not configured';
      console.error(message);
      setStatus('error');
      setError(message);
      return false;
    }

    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: toFormData(payload),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed (${response.status})`);
      }

      setStatus('success');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error submitting form';
      console.error('Formspree submit error', err);
      setStatus('error');
      setError(message);
      return false;
    }
  }, []);

  return { status, error, submit, reset };
}

function toFormData(payload: Record<string, FormDataEntryValue | string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    data.append(key, value);
  }
  return data;
}

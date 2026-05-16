import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useFormspree } from './useFormspree';

describe('useFormspree', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FORMSPREE_ENDPOINT', 'https://formspree.test/f/abc');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('starts in the idle state', () => {
    const { result } = renderHook(() => useFormspree());
    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
  });

  it('transitions to success when the endpoint returns ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response));
    const { result } = renderHook(() => useFormspree());

    let ok = false;
    await act(async () => {
      ok = await result.current.submit({ name: 'Jamie' });
    });

    expect(ok).toBe(true);
    expect(result.current.status).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('transitions to error when the endpoint returns non-ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response));
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useFormspree());

    let ok = true;
    await act(async () => {
      ok = await result.current.submit({ name: 'Jamie' });
    });

    expect(ok).toBe(false);
    expect(result.current.status).toBe('error');
    expect(result.current.error).toContain('500');

    consoleError.mockRestore();
  });

  it('resets to idle after a successful submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response));
    const { result } = renderHook(() => useFormspree());

    await act(async () => {
      await result.current.submit({ name: 'Jamie' });
    });
    expect(result.current.status).toBe('success');

    act(() => result.current.reset());
    await waitFor(() => expect(result.current.status).toBe('idle'));
  });
});

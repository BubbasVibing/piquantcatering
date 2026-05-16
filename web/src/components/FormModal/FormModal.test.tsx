import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormModal from './FormModal';
import type { FormField } from '@/types/content';

const fields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'event_type',
    label: 'Event Type',
    type: 'select',
    options: ['Wedding', 'Corporate'],
    required: true,
  },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Hi…', fullWidth: true },
];

describe('FormModal', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FORMSPREE_ENDPOINT', 'https://formspree.test/f/abc');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('renders configured fields and the submit button', () => {
    render(<FormModal open onClose={() => {}} title="Reach Out" fields={fields} subject="Hello" />);

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument();
  });

  it('submits to the configured endpoint with subject and extra fields', async () => {
    render(
      <FormModal
        open
        onClose={() => {}}
        title="Reach Out"
        fields={fields}
        subject="Hello"
        extraFields={{ source: 'unit-test' }}
      />,
    );

    await userEvent.type(screen.getByLabelText(/^name/i), 'Jamie');
    await userEvent.type(screen.getByLabelText(/^email/i), 'jamie@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/event type/i), 'Wedding');
    await userEvent.click(screen.getByRole('button', { name: /send request/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [url, init] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe('https://formspree.test/f/abc');
    const body = init.body as FormData;
    expect(body.get('name')).toBe('Jamie');
    expect(body.get('email')).toBe('jamie@example.com');
    expect(body.get('event_type')).toBe('Wedding');
    expect(body.get('_subject')).toBe('Hello');
    expect(body.get('source')).toBe('unit-test');

    await screen.findByText(/thank you!/i);
  });
});

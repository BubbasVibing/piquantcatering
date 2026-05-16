import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('returns nothing when closed', () => {
    const { container } = render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        Body
      </Modal>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title, subtitle, and content when open', () => {
    render(
      <Modal open onClose={() => {}} title="Hello" subtitle="World">
        Inside
      </Modal>,
    );
    expect(screen.getByRole('dialog', { name: 'Hello' })).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('Inside')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Closable">
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Escapable">
        Body
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Backdrop">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement!;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

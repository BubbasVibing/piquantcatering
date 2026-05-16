'use client';

import { FormEvent, useEffect, useId, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import { useFormspree } from '@/hooks/useFormspree';
import type { FormField } from '@/types/content';
import styles from './FormModal.module.css';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fields: FormField[];
  subject: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  extraFields?: Record<string, string>;
}

export default function FormModal({
  open,
  onClose,
  title,
  subtitle,
  fields,
  subject,
  submitLabel = 'Send Request',
  successTitle = 'Thank you!',
  successMessage = 'We have received your message and will be in touch soon.',
  extraFields,
}: FormModalProps) {
  const { status, error, submit, reset } = useFormspree();
  const [values, setValues] = useState<Record<string, string>>({});
  const formInstanceId = useId();

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setValues({});
        reset();
      }, 250);
      return () => window.clearTimeout(timer);
    }
  }, [open, reset]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('_gotcha')) return;
    const payload: Record<string, string> = { _subject: subject, ...extraFields };
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value;
    }
    await submit(payload);
  };

  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={subtitle}>
      {status === 'success' ? (
        <div className={styles.success}>
          <FontAwesomeIcon icon={faCheck} className={styles.successIcon} />
          <h3 className={styles.successTitle}>{successTitle}</h3>
          <p className={styles.successMessage}>{successMessage}</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {fields.map((field) => {
            const fieldId = `${formInstanceId}-${field.name}`;
            const className = `${styles.field} ${field.fullWidth ? styles.fullWidth : ''}`.trim();
            return (
              <div key={field.name} className={className}>
                <label htmlFor={fieldId} className={styles.label}>
                  {field.label}
                  {field.required && <span className={styles.required}>*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={fieldId}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={field.rows ?? 4}
                    className={styles.textarea}
                    value={values[field.name] ?? ''}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={fieldId}
                    name={field.name}
                    required={field.required}
                    className={styles.select}
                    value={values[field.name] ?? ''}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  >
                    <option value="">{field.placeholder ?? 'Select an option'}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={fieldId}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={styles.input}
                    value={values[field.name] ?? ''}
                    onChange={(event) => handleChange(field.name, event.target.value)}
                  />
                )}
              </div>
            );
          })}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className={styles.honeypot}
            aria-hidden="true"
          />
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : submitLabel}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/siteContent';
import { useLenis } from '../context/LenisContext';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/portfolioLogic';
import { CloseIcon } from './Icons';
import { PillButton } from './UIPrimitives';

const INITIAL_FORM: ContactFormValues = {
  name: '',
  email: '',
  topic: '',
  message: '',
  website: '',
};

const TOPICS = SITE.contact.form.topics;

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const formCopy = SITE.contact.form;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lenis } = useLenis();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setStatus((prev) => (prev === 'success' ? 'idle' : prev));
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) {
      lenis?.start();
    }
  }, [open, lenis]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactForm(values, TOPICS);
    setErrors(nextErrors);
    setFormError('');

    const firstInvalidKey = (Object.keys(INITIAL_FORM) as Array<keyof ContactFormValues>).find(
      (key) => nextErrors[key]
    );
    if (firstInvalidKey) {
      document.getElementById(`contact-${firstInvalidKey}`)?.focus();
      return;
    }

    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 250));
    setStatus('success');
    setValues(INITIAL_FORM);
  };

  const renderField = (
    name: keyof ContactFormValues,
    label: string,
    opts: {
      as?: 'input' | 'select' | 'textarea';
      type?: string;
      autoComplete?: string;
      maxLength?: number;
      rows?: number;
      required?: boolean;
      children?: React.ReactNode;
    } = {}
  ) => {
    const { as, ...rest } = opts;
    const Tag = as ?? (opts.rows ? 'textarea' : 'input');
    const errorText = errors[name];
    return (
      <div className="contact-modal__field">
        <label htmlFor={`contact-${name}`}>{label}</label>
        <Tag
          id={`contact-${name}`}
          name={name}
          value={values[name]}
          onChange={handleChange}
          aria-invalid={!!errorText}
          aria-describedby={errorText ? `contact-${name}-error` : undefined}
          {...(rest as Record<string, unknown>)}
        />
        {errorText && (
          <p className="contact-modal__error" id={`contact-${name}-error`}>
            {errorText}
          </p>
        )}
      </div>
    );
  };

  return (
    <dialog
      ref={dialogRef}
      className="contact-modal"
      aria-labelledby="contact-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      data-lenis-prevent="true"
    >
      <div className="contact-modal__body">
        <div className="contact-modal__head">
          <h2 id="contact-modal-title">{formCopy.title}</h2>
          <button
            type="button"
            className="contact-modal__close"
            onClick={onClose}
            aria-label={formCopy.close}
          >
            <CloseIcon />
          </button>
        </div>

        {status === 'success' ? (
          <div className="contact-modal__success" role="status">
            <p>{formCopy.success}</p>
            <PillButton arrow={false} onClick={onClose}>
              {formCopy.close}
            </PillButton>
          </div>
        ) : (
          <form className="contact-modal__form" onSubmit={handleSubmit} noValidate>
            {renderField('name', formCopy.name, { autoComplete: 'name', maxLength: 100 })}
            {renderField('email', formCopy.email, { type: 'email', autoComplete: 'email' })}
            {renderField('topic', formCopy.topic, {
              as: 'select',
              required: true,
              children: (
                <>
                  <option value="" disabled>
                    {formCopy.topicPlaceholder}
                  </option>
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </>
              ),
            })}
            {renderField('message', formCopy.message, { rows: 5, maxLength: 2000 })}

            <div className="contact-modal__hp" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={handleChange}
              />
            </div>

            <p className="contact-modal__form-error" role="alert">
              {formError}
            </p>

            <PillButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? formCopy.sending : formCopy.submit}
            </PillButton>
          </form>
        )}
      </div>
    </dialog>
  );
}

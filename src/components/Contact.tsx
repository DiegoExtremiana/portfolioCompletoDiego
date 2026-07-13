import { useState, type FormEvent } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { CONTACT_LINKS, EMAIL, PROFILE } from '../data/content';

const ICONS: Record<string, IconType> = {
  email: FiMail,
  whatsapp: FaWhatsapp,
  linkedin: FiLinkedin,
  github: FiGithub,
};

type Status = 'idle' | 'sending' | 'success' | 'error' | 'fallback';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot
}

const EMPTY: FormState = { name: '', email: '', subject: '', message: '', company: '' };

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Introduce un email válido.';
  if (form.subject.trim().length < 3) errors.subject = 'El asunto es demasiado corto.';
  if (form.message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  return errors;
}

function mailtoFallback(form: FormState): string {
  const body = `${form.message}\n\n— ${form.name} (${form.email})`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    if (form.company) return; // honeypot tripped — silently ignore bots

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(EMPTY);
      } else if (res.status === 503) {
        // Backend not configured → open the visitor's mail client instead.
        setStatus('fallback');
        window.location.href = mailtoFallback(form);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="container-wide py-24 sm:py-28">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tienes un proyecto en mente o una oportunidad? Escríbeme y te respondo lo antes posible."
      />

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal className="space-y-3">
          <div className="card flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
              <FiMapPin size={18} />
            </span>
            <div>
              <p className="text-xs text-faint">Ubicación</p>
              <p className="font-medium">{PROFILE.location}</p>
            </div>
          </div>

          {CONTACT_LINKS.map((link) => {
            const Icon = ICONS[link.id] ?? FiMail;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-3 p-4"
              >
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-faint">{link.label}</p>
                  <p className="truncate font-medium">{link.value}</p>
                </div>
              </a>
            );
          })}
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Nombre"
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                placeholder="Tu nombre"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                placeholder="tu@email.com"
              />
            </div>
            <div className="mt-5">
              <Field
                id="subject"
                label="Asunto"
                value={form.subject}
                onChange={update('subject')}
                error={errors.subject}
                placeholder="¿De qué quieres hablar?"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Cuéntame los detalles…"
                className={`w-full resize-y rounded-xl border bg-surface-2/60 px-4 py-3 text-sm text-content placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                  errors.message ? 'border-red-500/70' : 'border-border'
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            {/* Honeypot: hidden from users, catches bots. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.company}
              onChange={update('company')}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'sending'} className="btn-primary">
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                <FiSend size={16} />
              </button>

              {status === 'success' && (
                <p className="text-sm text-accent2">¡Mensaje enviado! Te responderé pronto.</p>
              )}
              {status === 'fallback' && (
                <p className="text-sm text-muted">Abriendo tu cliente de correo…</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400">
                  No se pudo enviar.{' '}
                  <a href={mailtoFallback(form)} className="text-accent hover:underline">
                    Escríbeme por email
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

function Field({ id, label, value, onChange, error, type = 'text', placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        className={`w-full rounded-xl border bg-surface-2/60 px-4 py-3 text-sm text-content placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/50 ${
          error ? 'border-red-500/70' : 'border-border'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

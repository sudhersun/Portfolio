'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.33, 1, 0.68, 1] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm = { fullName: '', phone: '', email: '', description: '' };

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[var(--accent)]';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-neutral-900">{label}</span>
      {children}
    </label>
  );
}

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    // Wait out the close animation before wiping the form/status.
    const t = setTimeout(() => {
      setForm(initialForm);
      setStatus('idle');
      setError('');
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            className="relative w-full max-w-md rounded-3xl border border-black/5 bg-white p-7 shadow-2xl shadow-black/40 lg:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-neutral-400 transition-colors hover:text-neutral-900"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              </svg>
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="border-accent/40 text-accent flex h-14 w-14 items-center justify-center rounded-full border">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-neutral-900">Thank you.</h3>
                <p className="max-w-[32ch] text-sm leading-relaxed text-neutral-500">
                  Your message has been sent. I&rsquo;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm text-white transition-colors hover:bg-[var(--accent)]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-semibold tracking-tight text-neutral-900">Let&rsquo;s talk.</h3>
                <p className="mt-2 text-sm text-neutral-500">Reach out and I&rsquo;ll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <Field label="Full name">
                    <input
                      required
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone number">
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me a bit about your project…"
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </Field>

                  {status === 'error' && <p className="text-sm text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)] disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

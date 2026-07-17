import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Contact({ profile, reducedMotion }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your form backend of choice
    // (Formspree, Resend, Netlify Forms, a serverless function, etc.)
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  const socials = [
    { icon: Github, href: profile.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: profile.social.email, label: 'Email' },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
      {/* subtle ambient particles, purely decorative */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-circuit/40 animate-floatSlow"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 6) * 0.6}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="section-eyebrow mb-3">Contact</p>
        <h2 className="section-heading text-balance">Let's build something.</h2>
        <p className="mt-4 max-w-lg text-ink-300">
          Open to internships, research collaborations, and interesting hardware problems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto]">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card space-y-5 p-6"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-ink-300">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-circuit"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-ink-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-circuit"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-ink-300">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-circuit"
              placeholder="What are you working on?"
            />
          </div>

          <MagneticButton type="submit" className="btn-primary w-full justify-center" reducedMotion={reducedMotion} disabled={status !== 'idle'}>
            {status === 'sent' ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Message sent
              </>
            ) : status === 'sending' ? (
              'Sending…'
            ) : (
              <>
                <Send className="h-4 w-4" /> Send Message
              </>
            )}
          </MagneticButton>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-row gap-4 md:flex-col"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              data-cursor="hover"
              className="glass-card flex h-12 w-12 items-center justify-center text-ink-300 transition-colors duration-200 hover:text-circuit hover:shadow-glow"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>

      <p className="mt-20 text-center font-mono text-xs text-ink-700">
        Designed & built by {profile.name} · {new Date().getFullYear()}
      </p>
    </section>
  );
}

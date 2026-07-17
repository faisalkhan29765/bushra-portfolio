import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import skills from '../data/skills.json';
import experience from '../data/experience.json';

export default function Resume({ profile }) {
  const education = experience.find((e) => e.type === 'education');

  return (
    <section id="resume" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-14 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className="section-eyebrow mb-3">Resume</p>
          <h2 className="section-heading text-balance">The one-page version.</h2>
        </div>

        {/* TODO: replace /public/resume.pdf with your actual resume file */}
        <a
          href={profile.resumeUrl}
          download
          data-cursor="hover"
          className="btn-primary"
        >
          <Download className="h-4 w-4" /> Download Resume (PDF)
        </a>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr]">
        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass-card space-y-6 p-6"
        >
          <div>
            <p className="section-eyebrow mb-2">Education</p>
            {education && (
              <>
                <p className="font-heading font-semibold text-ink-100">{education.title}</p>
                <p className="text-sm text-ink-500">{education.org}</p>
                <p className="text-sm text-ink-300">{education.period} · {education.meta}</p>
              </>
            )}
          </div>

          <div>
            <p className="section-eyebrow mb-2">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.chips.slice(0, 10).map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="section-eyebrow mb-2">Contact</p>
            <p className="text-sm text-ink-300">{profile.email}</p>
            <p className="text-sm text-ink-300">{profile.location}</p>
          </div>
        </motion.div>

        {/* Embedded PDF viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card overflow-hidden p-2"
        >
          <object
            data={profile.resumeUrl}
            type="application/pdf"
            className="h-[520px] w-full rounded-xl"
            aria-label="Embedded resume PDF"
          >
            {/* Fallback shown if the browser can't render the embedded PDF (or the file is missing) */}
            <div className="flex h-[520px] flex-col items-center justify-center gap-3 rounded-xl bg-lab-panel2 p-6 text-center">
              <FileText className="h-8 w-8 text-circuit" aria-hidden="true" />
              <p className="text-sm text-ink-300">
                Drop your file at <code className="font-mono text-circuit">/public/resume.pdf</code> to preview it here.
              </p>
            </div>
          </object>
        </motion.div>
      </div>
    </section>
  );
}

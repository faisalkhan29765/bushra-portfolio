import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Users, Award } from 'lucide-react';
import experience from '../data/experience.json';

const ICONS = {
  education: GraduationCap,
  work: Briefcase,
  activity: Users,
  certification: Award,
};

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="section-eyebrow mb-3">Experience & Education</p>
        <h2 className="section-heading text-balance">Where the hours went.</h2>
      </motion.div>

      <ol className="relative border-l border-white/[0.08] pl-8">
        {/* TODO: replace with your actual experience/education data in src/data/experience.json */}
        {experience.map((item, i) => {
          const Icon = ICONS[item.type] ?? Briefcase;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full border border-circuit/40 bg-lab-bg text-circuit">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <div className="glass-card p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-circuit">{item.period}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-ink-100">{item.title}</h3>
                <p className="text-sm text-ink-500">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{item.description}</p>
                {item.meta && (
                  <p className="mt-3 inline-block rounded-full bg-copper/10 px-3 py-1 font-mono text-[11px] text-copper">
                    {item.meta}
                  </p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

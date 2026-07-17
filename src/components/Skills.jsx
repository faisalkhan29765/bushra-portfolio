import { motion } from 'framer-motion';
import skillsData from '../data/skills.json';

function SkillBar({ name, level, index }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-ink-300">{name}</span>
        <span className="font-mono text-xs text-circuit">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-circuit to-copper"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="section-eyebrow mb-3">Skills</p>
        <h2 className="section-heading text-balance">Tools of the trade.</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {skillsData.categories.map((category, ci) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: ci * 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="mb-5 font-heading text-lg font-semibold text-ink-100">
              {category.name}
            </h3>
            <div className="space-y-4">
              {category.items.map((item, i) => (
                <SkillBar key={item.name} name={item.name} level={item.level} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive chip cloud — quick-scan tag list */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex flex-wrap gap-3"
      >
        {skillsData.chips.map((chip) => (
          <span key={chip} className="chip" data-cursor="hover">
            {chip}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

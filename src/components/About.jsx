import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Target } from 'lucide-react';

export default function About({ profile }) {
  const facts = [
    { icon: GraduationCap, label: 'University', value: profile.university },
    { icon: Target, label: 'Focus Area', value: profile.focus },
    { icon: MapPin, label: 'Based in', value: profile.location },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,340px)_1fr]">
        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72"
        >
          <div
            className="absolute inset-0 animate-pulseGlow"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.5), rgba(255,183,3,0.4))',
              filter: 'blur(18px)',
            }}
          />
          <div
            className="relative h-full w-full overflow-hidden border border-circuit/40"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            {/* TODO: replace with your actual profile photo at /public/profile.jpg */}
            <img
              src={profile.profileImage}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            <div
              className="hidden h-full w-full items-center justify-center bg-lab-panel2 font-mono text-sm text-ink-500"
            >
              profile.jpg
            </div>
          </div>
        </motion.div>

        {/* Bio + facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="section-eyebrow mb-3">About</p>
          <h2 className="section-heading mb-6 text-balance">
            Building things that switch, sense, and move.
          </h2>
          {/* TODO: replace with your actual bio */}
          <p className="max-w-2xl text-ink-300 leading-relaxed">{profile.bio}</p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card p-4">
                <Icon className="mb-2 h-4 w-4 text-circuit" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-wide text-ink-500">{label}</p>
                <p className="mt-1 text-sm font-medium text-ink-100">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

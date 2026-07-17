import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, CircuitBoard } from 'lucide-react';
import projects from '../data/projects.json';

function ProjectCard({ project, onOpen, index }) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      data-cursor="hover"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass-card group flex flex-col items-start p-6 text-left transition-shadow duration-300 hover:shadow-glow"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-circuit/10 text-circuit">
        <CircuitBoard className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-ink-100 group-hover:text-circuit transition-colors duration-200">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-ink-300">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink-500">
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 id="project-modal-title" className="font-heading text-2xl font-bold text-ink-100">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close project details"
                data-cursor="hover"
                className="rounded-full p-1.5 text-ink-500 hover:text-circuit hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-1 font-mono text-xs uppercase tracking-wide text-circuit">
              {project.role} · {project.year}
            </p>
            <p className="mt-4 text-ink-300 leading-relaxed">{project.description}</p>

            <ul className="mt-5 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-ink-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="btn-outline"
                >
                  <Github className="h-4 w-4" /> View Code
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="btn-primary"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="section-eyebrow mb-3">Projects</p>
        <h2 className="section-heading text-balance">Selected builds.</h2>
      </motion.div>

      {/* TODO: replace with your actual project data in src/data/projects.json */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onOpen={setActive} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

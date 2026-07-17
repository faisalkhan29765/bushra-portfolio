import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HeroFallback from '../three/HeroFallback';
import MagneticButton from './MagneticButton';
import useWebGLSupport from '../hooks/useWebGLSupport';

// Lazy-loaded: three.js + @react-three/fiber/drei/postprocessing are the
// heaviest dependency in the bundle. Splitting this out means the rest of
// the page (fonts, layout, copy) is interactive well before the 3D chunk
// finishes downloading — especially valuable on mobile connections.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'));

export default function Hero({ profile, reducedMotion }) {
  const webglSupported = useWebGLSupport();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-4">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 md:order-1"
        >
          <p className="section-eyebrow mb-4">// electrical engineering</p>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ink-100 sm:text-5xl lg:text-6xl">
            {/* TODO: replace with your actual name */}
            {profile.name}
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-300">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton as="a" href="#projects" className="btn-primary" reducedMotion={reducedMotion}>
              View Projects
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="btn-outline" reducedMotion={reducedMotion}>
              Get in Touch
            </MagneticButton>
          </div>
        </motion.div>

        {/* 3D / fallback column */}
        <div className="order-1 h-[360px] sm:h-[440px] md:order-2 md:h-[520px]">
          {webglSupported ? (
            <Suspense fallback={<HeroFallback />}>
              <HeroCanvas reducedMotion={reducedMotion} />
            </Suspense>
          ) : (
            <HeroFallback />
          )}
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor="hover"
        className="absolute bottom-8 flex flex-col items-center gap-2 text-ink-500 transition-colors hover:text-circuit"
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}

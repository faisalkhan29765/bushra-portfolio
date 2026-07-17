import CircuitBackground from './components/CircuitBackground';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';
import useReducedMotion from './hooks/useReducedMotion';
import profile from './data/profile.json';

export default function App() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <CircuitBackground />
      <CustomCursor reducedMotion={reducedMotion} />
      <Nav name={profile.name} />

      <main>
        <Hero profile={profile} reducedMotion={reducedMotion} />
        <About profile={profile} />
        <Skills />
        <Projects />
        <Experience />
        <Resume profile={profile} />
        <Contact profile={profile} reducedMotion={reducedMotion} />
      </main>
    </>
  );
}

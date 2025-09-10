import { Suspense } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Suspense>
  );
};

export default Index;

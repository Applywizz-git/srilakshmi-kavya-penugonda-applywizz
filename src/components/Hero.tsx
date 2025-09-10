import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, ChevronDown } from 'lucide-react';
import { personalInfo, heroKeywords } from '../data/profile';
import ThreeBackground from './ThreeBackground';

export default function Hero() {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentKeywordIndex((prev) => (prev + 1) % heroKeywords.length);
        setIsTyping(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Hero Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="container mx-auto px-6 mt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <motion.p
              className="text-lg text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-gradient">{personalInfo.name}</span>
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                {personalInfo.subtitle}
              </h2>
              
              <div className="text-lg md:text-xl text-muted-foreground">
                <span>Specializing in </span>
                <motion.span
                  key={currentKeywordIndex}
                  className="text-primary font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isTyping ? 1 : 0, y: isTyping ? 0 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {heroKeywords[currentKeywordIndex]}
                </motion.span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {personalInfo.bio[0]}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button
                onClick={handleViewProjects}
                className="btn-hero px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Projects</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>


              <motion.button
                className="btn-secondary-hero px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <a href='public/kavya_resume.pdf' target="_blank" rel="noopener noreferrer">
                <span>Download Resume</span>
              </a>
                <Download className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <span>{personalInfo.email}</span>
              <span className="hidden sm:block">•</span>
              <span>{personalInfo.location}</span>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass border-4 border-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} - Principal Software Developer`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <span className="text-3xl">⚡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full glass hover:bg-primary/10 transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
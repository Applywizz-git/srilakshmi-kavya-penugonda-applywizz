import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const languages = [
  'Java', 'TypeScript', 'Go', 'Python', 'JavaScript', 'Kotlin', 'Scala', 'C++',
  'React', 'Spring Boot', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'GCP'
];

const statusMessages = [
  'Loading',
  'Initializing',
  'Compiling',
  'Building',
  'Deploying',
  'Ready'
];

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [nameTyped, setNameTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const { progress: threeProgress } = useProgress();
  
  const fullName = "Principal Software Developer";
  
  // Typewriter effect for name
  useEffect(() => {
    if (nameTyped.length < fullName.length) {
      const timeout = setTimeout(() => {
        setNameTyped(fullName.slice(0, nameTyped.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [nameTyped, fullName]);

  // Rotate languages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % languages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update status and progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        
        // Update status based on progress
        const statusIndex = Math.min(Math.floor(newProgress / 20), statusMessages.length - 1);
        setCurrentStatusIndex(statusIndex);
        
        // Hide overlay when complete
        if (newProgress >= 100 && threeProgress >= 100) {
          setTimeout(() => setIsVisible(false), 1000);
        }
        
        return newProgress;
      });
    }, 200);

    // Force completion after 2.5s
    const timeout = setTimeout(() => {
      setProgress(100);
      setCurrentStatusIndex(statusMessages.length - 1);
      setTimeout(() => setIsVisible(false), 500);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [threeProgress]);

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center max-w-md mx-auto px-6">
            {/* Name Banner */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {nameTyped}
                {nameTyped.length < fullName.length && (
                  <span className="animate-blink">|</span>
                )}
              </h1>
              
              {nameTyped.length >= fullName.length && (
                <motion.div
                  className="text-shimmer text-lg font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  3D Skillverse Portfolio
                </motion.div>
              )}
            </motion.div>

            {/* Language Ring */}
            <motion.div
              className="mb-8 h-24 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {prefersReducedMotion ? (
                <div className="flex flex-wrap justify-center gap-2">
                  {languages.slice(0, 5).map((lang, i) => (
                    <span key={lang} className="tech-badge text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="relative w-48 h-24">
                  <AnimatePresence mode="wait">
                    {languages.map((lang, i) => {
                      const isActive = i === currentLanguageIndex;
                      const angle = (i / languages.length) * Math.PI * 2;
                      const radius = 60;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <motion.div
                          key={lang}
                          className={`absolute tech-badge text-xs ${
                            isActive ? 'bg-primary text-primary-foreground scale-110 glow-primary' : ''
                          }`}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0.6, 
                            scale: isActive ? 1.1 : 0.9,
                            rotate: isActive ? 0 : 15 
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {lang}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">
                  {Math.round(Math.max(progress, threeProgress))}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {statusMessages[currentStatusIndex]} • {languages[currentLanguageIndex]}
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full glow-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(progress, threeProgress)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Status Line */}
            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              aria-live="polite"
            >
              Initializing 3D environment and portfolio components...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
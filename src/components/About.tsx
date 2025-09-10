import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, metrics } from '../data/profile';

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const highlights = [
  {
    title: 'Scalability',
    description: 'Designing systems that handle millions of users with optimal performance',
    icon: '🚀'
  },
  {
    title: 'Reliability',
    description: 'Building fault-tolerant systems with 99.99% uptime guarantees',
    icon: '🛡️'
  },
  {
    title: 'Security',
    description: 'Implementing robust security measures and best practices',
    icon: '🔒'
  },
  {
    title: 'Optimization',
    description: 'Continuous performance tuning and cost optimization strategies',
    icon: '⚡'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-20 relative overflow-hidden"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate about building scalable, reliable software that makes a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              {personalInfo.bio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="text-lg text-foreground/90 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Metrics Grid */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-6 mt-12"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter end={metrics.yearsExperience} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter end={metrics.projectsCompleted} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Projects Completed</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter end={metrics.accuracyImprovement} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Accuracy Improvement</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter end={metrics.certifications} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Certifications</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={itemVariants}
                  className="card-gradient p-6 rounded-xl card-hover border border-border/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gradient">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


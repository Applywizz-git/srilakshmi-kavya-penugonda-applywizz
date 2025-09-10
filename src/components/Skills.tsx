import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/profile';
import { Progress } from './ui/progress';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-20 relative"
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive expertise across the full technology stack
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {skills.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="card-gradient p-8 rounded-xl border border-border/50 card-hover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gradient">
                  {category.category}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={isInView ? skill.level : 0} 
                          className="h-2 bg-muted"
                        />
                        
                        {/* Skill level indicator */}
                        <motion.div
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut" 
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Summary */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="card-gradient p-6 rounded-xl border border-border/50">
                <div className="text-2xl font-bold text-primary mb-2">
                  {skills.reduce((acc, category) => acc + category.skills.length, 0)}+
                </div>
                <p className="text-sm text-muted-foreground">Technologies</p>
              </div>
              
              <div className="card-gradient p-6 rounded-xl border border-border/50">
                <div className="text-2xl font-bold text-primary mb-2">4</div>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              
              <div className="card-gradient p-6 rounded-xl border border-border/50">
                <div className="text-2xl font-bold text-primary mb-2">90%+</div>
                <p className="text-sm text-muted-foreground">Average Proficiency</p>
              </div>
              
              <div className="card-gradient p-6 rounded-xl border border-border/50">
                <div className="text-2xl font-bold text-primary mb-2">2+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data/profile';
import { Badge } from './ui/badge';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

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
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="education" 
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
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Education</span> & Academic Background
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strong foundation in computer science and information systems
            </p>
          </motion.div>

          {/* Education Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary to-secondary/20"></div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-lg"></div>

                {/* Content */}
                <div className="ml-20 card-gradient p-8 rounded-xl border border-border/50 card-hover group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary/30 transition-colors">
                        <GraduationCap className="w-6 h-6 text-foreground" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-lg font-semibold mb-2">
                          {edu.school}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* GPA & Honors */}
                    {(edu.gpa || edu.honors) && (
                      <div>
                        {edu.gpa && (
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-muted-foreground">GPA: </span>
                            <span className="font-bold text-foreground">{edu.gpa}</span>
                          </div>
                        )}
                        
                        {edu.honors && (
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Honors:</p>
                            <div className="flex flex-wrap gap-2">
                              {edu.honors.map((honor) => (
                                <Badge key={honor} variant="secondary" className="text-xs">
                                  {honor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Relevant Coursework */}
                    {edu.coursework && (
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Relevant Coursework:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <Badge key={course} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-secondary/10 to-transparent rounded-xl"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Summary */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="card-gradient p-8 rounded-xl border border-border/50 max-w-md mx-auto">
              <GraduationCap className="w-12 h-12 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">
                {education.length} Degrees
              </div>
              <p className="text-muted-foreground">
                Masters & Bachelor's in Computer Science
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                <span>Currently pursuing Masters degree</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
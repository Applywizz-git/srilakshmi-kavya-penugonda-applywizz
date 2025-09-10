import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../data/profile';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Award, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateY: -15 },
  visible: { opacity: 1, y: 0, rotateY: 0 }
};

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="certifications" 
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
              <span className="text-gradient">Certifications</span> & Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional certifications demonstrating expertise and commitment to continuous learning
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="group card-gradient p-6 rounded-xl border border-border/50 card-hover relative overflow-hidden"
                whileHover={{ 
                  y: -5,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border-2 border-primary rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-secondary rounded-full"></div>
                </div>

                {/* Award Icon */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {cert.date}
                    </Badge>
                  </div>
                </div>

                {/* Certification Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>
                  
                  <p className="text-primary font-semibold mb-4">
                    {cert.organization}
                  </p>

                  {/* Credential Details */}
                  <div className="space-y-2 mb-4">
                    {cert.credentialId && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Credential ID: </span>
                        <span className="font-mono text-foreground">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Verification Link */}
                  {cert.verificationUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.open(cert.verificationUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Certificate
                    </Button>
                  )}
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="card-gradient p-8 rounded-xl border border-border/50 max-w-md mx-auto">
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.length}
              </div>
              <p className="text-muted-foreground">
                Professional Certifications Earned
              </p>
              <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
                <span>AWS Academy</span>
                <span>•</span>
                <span>Cisco</span>
                <span>•</span>
                <span>Coursera</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
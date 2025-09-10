import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Autoplay } from 'swiper/modules';
import { projects } from '../data/profile';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Eye } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

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
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const num = [1, 2, 3];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="projects" 
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
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of full-stack applications and innovative solutions
            </p>
          </motion.div>

          {/* Projects Carousel */}
          <motion.div variants={itemVariants} className="relative">
            <Swiper
              modules={[Navigation, Pagination, Parallax, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              parallax={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                }
              }}
              className="!pb-16"
            >
              {projects.map((project,index) => (
                <SwiperSlide key={project.id}>
                  <motion.div
                    className="card-gradient rounded-xl overflow-hidden border border-border card-hover group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img src={`/project${index+1}.png`} alt={project.title} className="w-full h-48 object-cover" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gradient">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {/* {!project.liveUrl && !project.githubUrl && (
                          <Button size="sm" className="flex-1" disabled>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )} */}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="swiper-button-prev !text-primary !scale-75"></div>
            <div className="swiper-button-next !text-primary !scale-75"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
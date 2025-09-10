// import { useEffect, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { experiences } from '../data/profile';
// import { Badge } from './ui/badge';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.3,
//       delayChildren: 0.2
//     }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0 }
// };

// export default function Experience() {
//   const ref = useRef<HTMLElement>(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });

//   return (
//     <section 
//       id="experience" 
//       ref={ref}
//       className="py-20 relative"
//       data-aos="fade-up"
//       data-aos-duration="800"
//     >
//       <div className="container mx-auto px-6">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//           className="max-w-4xl mx-auto"
//         >
//           {/* Section Header */}
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//               Professional <span className="text-gradient">Experience</span>
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//               Building innovative solutions and delivering measurable results
//             </p>
//           </motion.div>

//           {/* Timeline */}
//           <div className="relative">
//             {/* Timeline line */}
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20"></div>

//             {experiences.map((experience, index) => (
//               <motion.div
//                 key={experience.id}
//                 variants={itemVariants}
//                 className="relative mb-12 last:mb-0"
//               >
//                 {/* Timeline dot */}
//                 <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>

//                 {/* Content */}
//                 <div className="ml-20 card-gradient p-8 rounded-xl border border-border/50 card-hover">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//                     <div>
//                       <h3 className="text-xl font-bold text-foreground mb-1">
//                         {experience.role}
//                       </h3>
//                       <p className="text-lg font-semibold text-primary mb-2">
//                         {experience.company}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-muted-foreground font-medium">
//                         {experience.duration}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {experience.location}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <ul className="space-y-3 mb-6">
//                     {experience.description.map((item, idx) => (
//                       <li key={idx} className="flex items-start text-foreground/90">
//                         <span className="text-primary mr-3 mt-1.5 text-xs">▸</span>
//                         <span className="leading-relaxed">{item}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Technologies */}
//                   <div className="mb-6">
//                     <p className="text-sm font-semibold text-muted-foreground mb-3">
//                       Technologies Used:
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {experience.technologies.map((tech) => (
//                         <Badge key={tech} variant="secondary" className="text-xs">
//                           {tech}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Achievements */}
//                   {experience.achievements && (
//                     <div>
//                       <p className="text-sm font-semibold text-muted-foreground mb-3">
//                         Key Achievements:
//                       </p>
//                       <ul className="space-y-2">
//                         {experience.achievements.map((achievement, idx) => (
//                           <li key={idx} className="flex items-start text-foreground/90">
//                             <span className="text-accent mr-3 mt-1.5 text-xs">★</span>
//                             <span className="leading-relaxed text-sm">{achievement}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/profile';
import { Badge } from './ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 relative"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building innovative solutions and delivering measurable results
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline rail (centered in the fixed column) */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-[1.25rem] w-px bg-gradient-to-b from-primary to-primary/20 md:left-[1.25rem]" />

            <div className="space-y-10">
              {experiences.map((experience) => (
                <motion.article
                  key={experience.id}
                  variants={itemVariants}
                  className="grid grid-cols-[2.5rem,1fr] gap-x-6"
                >
                  {/* Dot column */}
                  <div className="relative">
                    {/* Dot perfectly centered on the rail */}
                    <span className="absolute left-1/2 -translate-x-1/2 top-6 block h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-lg" />
                  </div>

                  {/* Card content */}
                  <div className="card-gradient p-6 md:p-8 rounded-xl border border-border/50 card-hover">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {experience.role}
                        </h3>
                        <p className="text-lg font-semibold text-primary">
                          {experience.company}
                        </p>
                      </div>
                      <div className="md:text-right text-muted-foreground">
                        <p className="font-medium">{experience.duration}</p>
                        <p className="text-sm">{experience.location}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-3 mb-6">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start text-foreground/90">
                          <span className="text-primary mr-3 mt-1.5 text-xs">▸</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-muted-foreground mb-3">
                        Technologies Used:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          Key Achievements:
                        </p>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-foreground/90">
                              <span className="text-accent mr-3 mt-1.5 text-xs">★</span>
                              <span className="leading-relaxed text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Professional Profile Data - Principal Software Developer
// Note: This file contains placeholder data structure. Replace with actual resume content.

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  category: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
  }[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  image?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  bio: string[];
  profileImage: string;
  resumeUrl: string;
}

// Actual resume information
export const personalInfo: PersonalInfo = {
  name: "Sri Lakshmi Kavya Penugonda",
  title: "Full Stack Developer",
  subtitle: "Building Responsive Web Applications & Cloud Solutions",
  email: "kavyareddy14p@gmail.com",
  phone: "+1 (203)-909-7342",
  location: "New Haven, CT",
  linkedin: "https://www.linkedin.com/in/kavyareddypenugonda/",
  github: "https://github.com/kavyareddy14p",
  bio: [
    "Full Stack Developer with hands-on experience in building responsive web applications, backend services, and cloud-deployed solutions.",
    "Proficient in React.js, Node.js, Express.js, Python, SQL, REST APIs, Redux, Firebase, Docker, and AWS, with demonstrated ability to integrate real-time data, API services, and interactive UI/UX.",
    "Strong foundation in database design, deployment pipelines, and agile collaboration, capable of delivering scalable and maintainable end-to-end solutions."
  ],
  profileImage: "/placeholder-profile.jpg",
  resumeUrl: "/resume.pdf"
};

export const experiences: Experience[] = [
  {
    id: "exp1",
    company: "Corizo Edutech",
    role: "Full Stack Developer Intern",
    duration: "Jan 2023 - May 2023",
    location: "Bangalore, IN",
    description: [
      "Built a Flask-based REST API that connected ML models with a JavaScript frontend, allowing researchers to upload heart sound files and receive instant classification results",
      "Increased detection accuracy by 15% through implementing feature extraction and noise reduction pipelines in Python with NumPy and Pandas",
      "Designed a SQLite database schema to store user inputs and processed outputs, improving query performance and cutting retrieval time by 20%",
      "Delivered interactive dashboards using Matplotlib and JavaScript charts, making model performance insights 30% more interpretable for stakeholders",
      "Enhanced usability with a responsive UI built in HTML5, CSS3, and Bootstrap, which boosted adoption during prototype testing by 25%"
    ],
    technologies: ["Python", "Flask", "JavaScript", "SQLite", "NumPy", "Pandas", "HTML5", "CSS3", "Bootstrap"],
    achievements: [
      "Increased detection accuracy by 15% through ML model optimization",
      "Improved query performance by 20% with efficient database design",
      "Boosted stakeholder insight interpretation by 30% with interactive dashboards",
      "Strengthened collaboration by contributing to Agile sprints and code reviews, helping reduce release cycles by 10%"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "proj1",
    title: "Smart E-Commerce Platform with Analytics",
    description: "Scalable e-commerce platform managing products, user accounts, orders, and inventory with integrated analytics dashboards.",
    image: "/placeholder-project1.jpg",
    technologies: ["PHP", "Laravel", "React.js", "MySQL", "Chart.js", "Power BI", "Stripe", "PayPal"],
    featured: true
  },
  {
    id: "proj2",
    title: "Real-Time Collaborative Chat & Notification System",
    description: "Messaging app with instant chat, file sharing, and multi-user collaboration featuring WebSockets and push notifications.",
    image: "/placeholder-project1.jpg",
    technologies: ["PHP", "Laravel", "Node.js", "WebSockets", "Firebase", "MongoDB", "Redis"],
    featured: true
  },
  {
    id: "proj3",
    title: "Personal Finance Management App",
    description: "Cross-platform finance app for tracking incomes, expenses, and budgets with currency conversion and secure authentication.",
    image: "/placeholder-project1.jpg",
    technologies: ["PHP", "React Native", "Firebase", "MySQL", "REST APIs"],
    featured: false
  }
];

export const skills: Skill[] = [
  {
    category: "Programming & Frameworks",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 88 },
      { name: "Java", level: 85 },
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "PHP", level: 85 }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "SQLite", level: 80 }
    ]
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 88 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 80 },
      { name: "GitHub Actions", level: 85 },
      { name: "Jenkins", level: 78 }
    ]
  },
  {
    category: "Frontend & UI/UX",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 88 },
      { name: "Redux", level: 85 },
      { name: "Figma", level: 80 }
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: "cert1",
    name: "AWS Cloud Foundations",
    organization: "AWS Academy",
    date: "2023"
  },
  {
    id: "cert2",
    name: "AWS Machine Learning",
    organization: "AWS Academy",
    date: "2023"
  },
  {
    id: "cert3",
    name: "CCNAv7: Introduction to Networks",
    organization: "Cisco Networking Academy",
    date: "2023"
  },
  {
    id: "cert4",
    name: "Meta Front-End Developer Professional Certificate",
    organization: "Coursera",
    date: "2023"
  },
  {
    id: "cert5",
    name: "HTML, CSS, and JavaScript for Web Developers",
    organization: "Coursera",
    date: "2023"
  }
];

export const education: Education[] = [
  {
    id: "edu1",
    degree: "Masters in Computer Information Systems",
    school: "New England College",
    year: "Jan 2024 - Dec 2025",
    coursework: ["Database Management", "Software Engineering", "System Analysis"]
  },
  {
    id: "edu2",
    degree: "Bachelor of Computer Science",
    school: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    year: "Jun 2019 - May 2023",
    coursework: ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
  }
];

// Metrics for counters (based on resume)
export const metrics = {
  yearsExperience: 2,
  projectsCompleted: 15,
  accuracyImprovement: 15,
  performanceBoost: 50,
  userEngagement: 35,
  certifications: 5
};

// Rotating keywords for hero section
export const heroKeywords = [
  "React.js",
  "Node.js",
  "Python",
  "AWS Cloud",
  "REST APIs",
  "Full Stack",
  "Web Apps",
  "DevOps"
];
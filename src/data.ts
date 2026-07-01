import { Skill, HackingSkill, Experience, Project, Certification, Achievement } from "./types";

export const ShridharInfo = {
  name: "Shridhar Kr. Mathur",
  title: "AI Engineer | Python Developer | Ethical Hacking Enthusiast",
  location: "Lucknow, India",
  email: "Shridhar.mathur@hotmail.com",
  phone: "+91 77048 00651",
  linkedin: "linkedin.com/in/shridharkumarmathur",
  github: "github.com/ItsShridharMathur",
  tagline: "Building Intelligent Systems. Breaking Barriers. Securing the Future.",
  bio: "I'm a Computer Science graduate specialising in Artificial Intelligence & Machine Learning from Abdul Kalam Technical University, Lucknow. I build intelligent systems — from real-time computer vision applications to AI-powered voice assistants. Currently expanding into Ethical Hacking and Cybersecurity to bridge the gap between AI and security. I believe the future belongs to engineers who can both build and protect intelligent systems.",
  resumeDriveUrl: "https://drive.google.com/file/d/1nzuhSLb54lHq1uhaXdhpmX8kqTmUgyUe/view?usp=sharing"
};

export const AISkills: Skill[] = [
  { name: "Python", percentage: 90, description: "Core programming language for ML/DL models, pipeline development, and automation scripts." },
  { name: "Machine Learning", percentage: 85, description: "Supervised and unsupervised models (Decision Trees, Random Forest, SVM, K-Means Clustering)." },
  { name: "Deep Learning (Fundamentals)", percentage: 75, description: "Neural networks theory, MLP configurations, optimization functions, and architectures." },
  { name: "Natural Language Processing", percentage: 80, description: "Intent classification, text parsing, SpeechRecognition integration, and dialog flows." },
  { name: "Computer Vision / OpenCV", percentage: 75, description: "Live image and video frame processing, bounding box rendering, and visual telemetry." },
  { name: "Git / GitHub", percentage: 85, description: "Version control, branching strategies, collaborative repository workflows, and releases." },
  { name: "C++", percentage: 70, description: "Object-oriented software foundations, algorithm analysis, and high-performance structures." },
  { name: "Java", percentage: 70, description: "Strong core object-oriented principles, multithreading, and algorithmic data structures." },
  { name: "React.js / Angular", percentage: 60, description: "Modular UI components, state engines, styled styling via Tailwind CSS, interactive dashboards." },
  { name: "Node.js", percentage: 60, description: "Backend routing, Express APIs, environment state, and proxy integrations." },
  { name: "TensorFlow / PyTorch (Fundamentals)", percentage: 50, description: "Model deployment setups, dataset loadings, basic weight training, and evaluation." }
];

export const HackingSkills: HackingSkill[] = [
  { name: "Network Security", status: "In Progress", description: "Securing subnet structures, protocol analysis (TCP/IP), firewalls, and Wireshark logs." },
  { name: "Penetration Testing", status: "Planned", description: "Offensive mapping of networks, port checking, exploiting target configurations ethically." },
  { name: "Kali Linux Tools", status: "Planned", description: "Learning suite utilities (Nmap, Metasploit, John the Ripper, Hydra) to find system weaknesses." },
  { name: "OWASP Top 10", status: "Planned", description: "Web application risks like SQL injection, cross-site scripting (XSS), and insecure configurations." },
  { name: "CTF Challenges", status: "Planned", description: "Solving cybersecurity puzzles to learn practical binary analysis, crypto, and web security." },
  { name: "Vulnerability Assessment", status: "Planned", description: "Scanning nodes, identifying outdated system frameworks, and generating security action plans." }
];

export const Experiences: Experience[] = [
  {
    company: "National Institute of Electronics & Information Technology (NIELIT)",
    role: "Machine Learning Intern — AI & Machine Learning Internship",
    duration: "Aug 2025 – Sep 2025",
    location: "Lucknow, India",
    points: [
      "Designed and implemented supervised & unsupervised ML pipelines in Python, applying Decision Trees, Random Forest, K-Means, and SVM on 1,000+ record datasets.",
      "Built a real-time Object Detection System UI with a YOLO-based backend model, enabling live-video inference across 20+ object classes at 20+ FPS.",
      "Evaluated model performance using accuracy, precision, recall, and F1-score to validate clinical or physical edge deployment.",
      "Gained end-to-end exposure to the complete ML development lifecycle, from raw data scraping and cleaning to UI-level user integrations."
    ],
    badges: ["AI/ML", "Python", "YOLO", "Internship"]
  }
];

export const ProjectsList: Project[] = [
  {
    title: "Object Detection System Interface",
    stack: ["Python", "OpenCV", "YOLO", "Tkinter/PyQt", "NumPy"],
    duration: "Aug 2025 – Sep 2025",
    description: "A full-stack desktop interface for real-time Computer Vision. Processes static images and live video streams through a YOLO-based backend model with custom bounding-box rendering across 20+ classes at 20+ FPS. Perfect for secure surveillance setups.",
    tags: ["Computer Vision", "YOLO", "Real-time", "Python"],
    githubUrl: "https://github.com/ItsShridharMathur",
    accentColor: "cyan"
  },
  {
    title: "EDITH — Personal AI Voice Assistant",
    stack: ["Python", "NLP", "SpeechRecognition", "pyttsx3", "PyAutoGUI", "OS Automation"],
    duration: "Sep 2025 – Present",
    description: "A fully voice-controlled personal AI assistant. Uses custom NLP intent classification to automate deep system tasks, open apps, search, and manage files. Achieves sub-2-second command response latency. Currently integrating an LLM-based conversational layer for natural multi-turn dialogues.",
    tags: ["NLP", "Voice AI", "Automation", "Ongoing"],
    githubUrl: "https://github.com/ItsShridharMathur",
    accentColor: "purple",
    isLive: true
  }
];

export const EducationInfo = {
  institution: "Abdul Kalam Technical University (AKTU)",
  degree: "B.Tech — Computer Science (AI & ML)",
  duration: "Aug 2022 – Present",
  location: "Lucknow, UP",
  cgpa: "6.1 / 10.0"
};

export const CertificationsList: Certification[] = [
  {
    title: "Internship Certificate — AI & Machine Learning using Python",
    program: "AI & ML Practical Internship",
    issuer: "NIELIT Lucknow (2025)",
    year: "2025",
    url: "https://github.com/ItsShridharMathur"
  },
  {
    title: "Data Structures using Java — 12-Week Programme",
    program: "Advanced Java & Core DSA Certification",
    issuer: "Logicpro Infosystem",
    year: "2024",
    url: "https://github.com/ItsShridharMathur"
  },
  {
    title: "Front-End Development Bootcamp — 2-Day Intensive",
    program: "HTML5, CSS3, Modern Responsive UI Design",
    issuer: "Coding Blocks",
    year: "2024",
    url: "https://github.com/ItsShridharMathur"
  },
  {
    title: "Fundamentals of C Programming",
    program: "Academics Programming Foundations Certification",
    issuer: "IIT Kanpur",
    year: "2023",
    url: "https://github.com/ItsShridharMathur"
  }
];

export const AchievementsList: Achievement[] = [
  {
    title: "Head of Sports — SPECTRUM 2024",
    event: "3-Day Inter-College Festival",
    description: "Successfully managed sports tournaments with 100+ active participants, ensuring seamless game schedules, referee allocations, and awards distribution.",
    icon: "Trophy"
  },
  {
    title: "IBM SkillsBuild Workshop",
    event: "6-Day Intensive (Nov 2024)",
    description: "Gained core fundamentals in artificial intelligence architectures, cloud computing platforms, and enterprise-grade software development practices.",
    icon: "Cpu"
  },
  {
    title: "Live MERN Stack Bootcamp",
    event: "3-Day Intensive Development (2024)",
    description: "Built a fully-featured full-stack web application from scratch using MongoDB database, Express.js servers, React.js UI, and Node.js backend pipelines.",
    icon: "Code"
  }
];

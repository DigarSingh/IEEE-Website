import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, FaUsers, FaRocket, FaCode, FaStar, FaFilter, FaArrowRight } from 'react-icons/fa';
import EventCard from '@/components/events/EventCard';
import EventsFilter from '@/components/events/EventsFilter';
import Layout from '@/components/Layout';
import { useIntersectionObserver } from '@/hooks/useEnhancedScroll';

export default function Events() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  
  // Temporarily disable parallax effects to fix the error
  // const { scrollY } = useScroll();
  // const { isVisible: sectionsVisible, observeElement } = useIntersectionObserver();
  
  // Parallax effects - temporarily disabled
  // const y = useTransform(scrollY, [0, 500], [0, 150]);
  // const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced events data
  const allEvents = [
    {
      id: 13,
      title: "Kindle Jr 4.0",
      date: "October 14, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "CSIT Labs",
      category: "competition",
      image: "/images/events/kindlejunior4.0.png",
      description: "The ultimate coding quiz competition is back! Test your programming knowledge, algorithms, and problem-solving skills in this exciting multi-round quiz challenge.",
      featured: true,
      attendees: 150,
      difficulty: "All Levels",
      tags: ["Coding", "Quiz", "Programming"],
      upcoming: true,
      registrationLink: "/quizlogin",
      detailedContent: {
        overview: "Kindle Jr 4.0 is the flagship coding competition that brings together programming enthusiasts from across the university. This multi-round quiz challenge tests participants' knowledge in algorithms, data structures, programming languages, and problem-solving techniques.",
        objectives: [
          "Test comprehensive programming knowledge across multiple languages",
          "Challenge problem-solving and algorithmic thinking skills",
          "Promote competitive programming culture",
          "Identify and reward top coding talent",
          "Foster learning through healthy competition"
        ],
        rounds: [
          {
            round: "Round 1: MCQ Blitz",
            description: "Fast-paced multiple choice questions covering programming fundamentals",
            duration: "35 minutes",
            topics: ["Programming basics", "Data types", "Control structures", "OOP concepts"]
          },
          {
            round: "Round 2: Code Analysis",
            description: "Analyze code snippets and predict outputs",
            duration: "60 minutes", 
            topics: ["Code debugging", "Logic analysis", "Output prediction", "Error identification"]
          },
          {
            round: "Final Round: Algorithm Challenge",
            description: "Solve complex algorithmic problems",
            duration: "90 minutes",
            topics: ["Data structures", "Algorithms", "Optimization", "Advanced programming"]
          }
        ],
        prizes: [
          "🏆 Exciting Prizes Await!",
        ],
        eligibility: [
          "Open only for 1st year students",
          "No prior competitive programming experience required",
          "Solo participation allowed",
          "Valid student ID required for registration"
        ],
        preparation: [
          "Review programming fundamentals in C, Java, or Python",
          "Practice data structures and algorithms",
          "Solve coding problems on platforms like HackerRank, LeetCode",
          "Understand time and space complexity concepts"
        ],
        registration: {
          process: "Register through the quiz portal",
          deadline: "October 13, 2025",
          fee: "Entry Fee: ₹99 / per person (₹49 for first 50 IEEE members)",
          requirements: ["Valid student ID", "Basic programming knowledge"]
        }
      }
    },
    {
      id: 1,
      title: "Machine Learning Workshop",
      date: "May 23, 2025",
      time: "11:30 Am Onwards",
      location: "Main Campus Auditorium",
      category: "workshop",
      image: "/images/events/ai-workshop.jpg",
      description: "Hands-on session with industry experts on implementing ML models.",
      featured: true,
      attendees: 120,
      difficulty: "Intermediate",
      tags: ["AI", "ML", "Python"],
      detailedContent: {
        overview: "This comprehensive machine learning workshop provides hands-on experience with industry-standard ML tools and techniques. Led by experienced data scientists and ML engineers, participants will learn to build, train, and deploy machine learning models for real-world applications.",
        objectives: [
          "Master fundamental machine learning algorithms and concepts",
          "Gain hands-on experience with Python libraries (scikit-learn, pandas, numpy)",
          "Learn data preprocessing and feature engineering techniques",
          "Understand model evaluation and validation methods",
          "Build end-to-end ML projects from data to deployment"
        ],
        agenda: [
          "11:30 AM - 12:00 PM: Welcome & ML Fundamentals Overview",
          "12:00 PM - 1:30 PM: Python for Data Science (pandas, numpy)",
          "1:30 PM - 2:30 PM: Lunch Break & Networking",
          "2:30 PM - 4:00 PM: Building Your First ML Model",
          "4:00 PM - 5:30 PM: Model Evaluation & Hyperparameter Tuning",
          "5:30 PM - 6:00 PM: Project Presentations & Wrap-up"
        ],
        prerequisites: [
          "Basic programming knowledge in Python",
          "Understanding of statistics and mathematics",
          "Laptop with Python 3.7+ and Jupyter Notebook installed",
          "Enthusiasm for data science and AI"
        ],
        outcomes: [
          "Comprehensive understanding of ML workflow",
          "Hands-on project portfolio with 3+ ML models",
          "Industry insights from expert practitioners",
          "Certificate of completion from IEEE GEU",
          "Networking opportunities with ML professionals"
        ],
        tools: ["Python", "Jupyter Notebook", "scikit-learn", "pandas", "matplotlib", "seaborn"],
        projects: [
          "Predictive Analytics for Sales Forecasting",
          "Image Classification using Neural Networks",
          "Sentiment Analysis of Social Media Data"
        ],
        speakers: [
          {
            name: "Dr. Ankit Verma",
            designation: "Senior Data Scientist, Google",
            expertise: "Deep Learning & Computer Vision"
          },
          {
            name: "Priya Singh",
            designation: "ML Engineer, Amazon",
            expertise: "Natural Language Processing"
          }
        ]
      }
    },
    {
      id: 2,
      title: "AWS Jam Skill Builder Program",
      date: "May 29, 2025",
      time: "8:00 AM",
      location: "Silver Convention Center",
      category: "conference",
      image: "/images/events/aws.jpg",
      description: "The AWS Cloud Quest Tournament and Jam Skill Builder Program is a hands-on, gamified learning experience designed to equip students with real-world cloud computing skills using the AWS platform.",
      featured: true,
      attendees: 1500,
      difficulty: "Beginner",
      tags: ["AWS", "Cloud", "DevOps"],
      detailedContent: {
        overview: "AWS Jam Skill Builder Program combines gamified learning with real-world cloud scenarios. Participants will navigate through AWS Cloud Quest challenges while building practical skills in cloud architecture, deployment, and management using Amazon Web Services.",
        objectives: [
          "Master fundamental AWS cloud services and architecture",
          "Gain hands-on experience with EC2, S3, RDS, and Lambda",
          "Learn cloud security best practices and IAM policies",
          "Understand scalable application deployment strategies",
          "Earn AWS digital badges and certificates"
        ],
        program: [
          "8:00 AM - 9:00 AM: Registration & AWS Account Setup",
          "9:00 AM - 10:30 AM: AWS Fundamentals & Cloud Quest Introduction", 
          "10:30 AM - 12:00 PM: Hands-on Lab Session 1: EC2 & S3",
          "12:00 PM - 1:00 PM: Lunch & Networking",
          "1:00 PM - 2:30 PM: Hands-on Lab Session 2: RDS & Lambda",
          "2:30 PM - 4:00 PM: AWS Jam Challenge Competition",
          "4:00 PM - 5:00 PM: Award Ceremony & Next Steps"
        ],
        challenges: [
          "Cloud Quest: Cloud Practitioner Journey",
          "Build and Deploy a Web Application",
          "Serverless Computing with Lambda",
          "Database Management with RDS",
          "Security & Identity Management"
        ],
        benefits: [
          "Official AWS digital badges upon completion",
          "AWS credits worth $100 for continued learning",
          "Certificate recognized by industry employers",
          "Direct mentorship from AWS certified professionals",
          "Opportunity to join AWS Student Ambassador program"
        ],
        prerequisites: [
          "Basic understanding of computing concepts",
          "Laptop with stable internet connection",
          "Creating AWS Free Tier account (guidance provided)",
          "No prior cloud experience required"
        ],
        prizes: [
          "🏆 Top Performer: AWS Certification Voucher + ₹10,000",
          "🥈 Runner-up: AWS Learning Credits + ₹5,000",
          "🥉 Third Place: AWS Credits + ₹3,000",
          "🎯 All Participants: AWS Digital Badges + Certificates"
        ],
        speakers: [
          {
            name: "Vikram Mehta",
            designation: "AWS Solutions Architect",
            expertise: "Cloud Architecture & DevOps"
          },
          {
            name: "Sarah Johnson",
            designation: "Senior Cloud Engineer, Accenture",
            expertise: "Serverless Computing & Security"
          }
        ]
      }
    },
    {
      id: 3,
      title: "Hackathon 2025",
      date: "May 01, 2025",
      time: "9:00 AM",
      location: "Innovation Hub",
      category: "hackathon",
      image: "/images/events/hackathon.jpg",
      description: "48-hour coding challenge with exciting prizes and opportunities.",
      featured: true,
      detailedContent: {
        overview: "Hackathon 2025 is the premier 48-hour coding marathon where innovation meets technology. Teams will collaborate to build groundbreaking solutions addressing real-world challenges across multiple domains including FinTech, HealthTech, EdTech, and Sustainability.",
        objectives: [
          "Foster innovation and creative problem-solving skills",
          "Encourage collaboration between diverse skill sets",
          "Build functional prototypes addressing real-world problems",
          "Network with industry professionals and potential employers", 
          "Showcase technical skills to judges and sponsors"
        ],
        timeline: [
          "Day 1 (May 1): 9:00 AM - Problem Statements Release & Team Formation",
          "Day 1: 10:00 AM - 11:59 PM - Development Phase Begins",
          "Day 2 (May 2): 12:00 AM - 8:00 PM - Continued Development",
          "Day 2: 8:00 PM - 10:00 PM - Final Submissions & Presentations",
          "Day 2: 10:00 PM - 11:00 PM - Judging & Award Ceremony"
        ],
        themes: [
          "🏥 HealthTech: Digital health solutions and medical innovations",
          "💰 FinTech: Financial technology and payment solutions",
          "📚 EdTech: Educational technology and learning platforms",
          "🌱 Sustainability: Environmental and green technology solutions",
          "🤖 AI/ML: Artificial Intelligence and Machine Learning applications"
        ],
        prizes: [
          "🏆 Grand Prize: ₹200,000 + Internship Opportunities + Mentorship",
          "🥈 Second Place: ₹150,000 + Tech Gadgets + Industry Recognition",
          "🥉 Third Place: ₹100,000 + Software Licenses + Certificates"
        ],
        requirements: [
          "Teams of 2-4 members (cross-functional preferred)",
          "Laptop with development environment setup",
          "Valid student/professional ID for registration",
          "Original ideas and code (no pre-built solutions)"
        ],
        mentorship: [
          "Industry mentors available throughout the event",
          "Technical workshops on emerging technologies",
          "Business model development guidance",
          "Pitch presentation training sessions"
        ],
        sponsors: [
          "Microsoft (Cloud Credits & Technical Support)",
          "Google (Firebase & GCP Credits)",
          "GitHub (Enterprise Access & Swag)",
          "Tech Mahindra (Internship Opportunities)"
        ],
        judges: [
          {
            name: "Ravi Agarwal",
            designation: "CTO, Paytm",
            expertise: "FinTech & Scalable Systems"
          },
          {
            name: "Dr. Meera Shah",
            designation: "Head of Innovation, Apollo Hospitals",
            expertise: "HealthTech & Digital Health"
          },
          {
            name: "Anand Kumar",
            designation: "Startup Founder & Angel Investor",
            expertise: "Product Development & Entrepreneurship"
          }
        ]
      }
    },
    {
      id: 4,
      title: "Accollade Code Hunt",
      date: "April 17, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Param Lab",
      category: "competition",
      image: "/images/events/accollade.jpg",
      description: "Code Hunt 2025 is here - an intense online treasure hunt crafted year-wise for 1st, 2nd & 3rd-year warriors!",
      detailedContent: {
        overview: "Accollade Code Hunt 2025 is an innovative online treasure hunt competition that combines coding challenges with problem-solving adventures. Designed with year-specific tracks, this competition tests participants' programming skills, logical thinking, and ability to decode clues through an engaging gamified experience.",
        objectives: [
          "Develop problem-solving skills through gamified coding challenges",
          "Foster healthy competition among different academic years",
          "Enhance logical thinking and pattern recognition abilities",
          "Promote collaborative learning and peer mentorship",
          "Bridge the gap between theoretical knowledge and practical application"
        ],
        tracks: [
          {
            year: "1st Year Warriors",
            description: "Foundation-level challenges focusing on basic programming concepts",
            topics: ["Basic Programming Logic", "Simple Algorithms", "Pattern Recognition", "Mathematical Puzzles"],
            difficulty: "Beginner"
          },
          {
            year: "2nd Year Challengers", 
            description: "Intermediate challenges involving data structures and algorithms",
            topics: ["Data Structures", "Sorting & Searching", "Dynamic Programming Basics", "Graph Theory"],
            difficulty: "Intermediate"
          },
          {
            year: "3rd Year Masters",
            description: "Advanced challenges requiring complex algorithmic thinking",
            topics: ["Advanced Algorithms", "Optimization Problems", "Competitive Programming", "System Design"],
            difficulty: "Advanced"
          }
        ],
        format: [
          "Online treasure hunt with multiple checkpoints",
          "Progressive difficulty levels with bonus challenges",
          "Team-based participation (2-3 members per team)",
          "Real-time leaderboard and progress tracking",
          "Interactive platform with hints and clues system"
        ],
        timeline: [
          "9:00 AM - 9:30 AM: Registration & Platform Access",
          "9:30 AM - 10:00 AM: Rules Briefing & Demo Round",
          "10:00 AM - 2:00 PM: Main Competition (4 hours)",
          "2:00 PM - 3:00 PM: Bonus Round & Final Challenges",
          "3:00 PM - 4:00 PM: Results & Award Ceremony"
        ],
        prizes: [
          "🏆 Overall Champions (Each Year): ₹8,000 + Certificates + Tech Gadgets",
          "🥈 Runners-up (Each Year): ₹5,000 + Certificates + Book Vouchers",
          "🥉 Third Place (Each Year): ₹3,000 + Certificates + Swag Kit",
          "🎯 Fastest Solver Award: ₹2,000 + Special Recognition",
          "🔍 Best Team Strategy: ₹2,000 + Mentorship Opportunity"
        ],
        skills: [
          "Programming fundamentals and debugging",
          "Algorithmic thinking and optimization",
          "Pattern recognition and logical reasoning",
          "Team collaboration and communication",
          "Time management under pressure"
        ],
        platform: [
          "Custom-built online treasure hunt portal",
          "Real-time progress tracking and hints system", 
          "Interactive coding environment with multiple language support",
          "Automated testing and instant feedback",
          "Live chat support during competition"
        ],
        benefits: [
          "Year-appropriate skill development and assessment",
          "Networking with peers across different academic levels",
          "Exposure to competitive programming environment",
          "Recognition and portfolio enhancement",
          "Mentorship opportunities with senior students and faculty"
        ],
        requirements: [
          "Laptop with stable internet connection",
          "Basic programming knowledge in any language",
          "Team formation (2-3 members from same year)",
          "Valid student ID for registration verification"
        ]
      }
    },
    {
      id: 5,
      title: "KINDLE JUNIOR 3.0",
      date: "November  23, 2024",
      time: "12 PM onwards",
      location: "New Lab 1&2 CSIT",
      category: "competition",
      image: "/images/events/kindle.jpg",
      description: "Kindle Junior 3.0 is the flagship coding competition hosted by the Computer Science Department at CSIT. Designed to challenge and celebrate coding talent, the event features three electrifying rounds—MCQ Blitz, Output Battle, and Test Case Frenzy.",
      detailedContent: {
        overview: "Kindle Junior 3.0 represents the third iteration of our flagship coding competition, bringing together the brightest programming minds to compete in a series of challenging rounds. This competition has become the benchmark for coding excellence at CSIT, featuring progressively difficult challenges that test both theoretical knowledge and practical coding skills.",
        objectives: [
          "Identify and celebrate exceptional coding talent",
          "Promote algorithmic thinking and problem-solving skills",
          "Foster competitive programming culture within the institution",
          "Provide platform for peer learning and knowledge sharing",
          "Bridge academic concepts with practical coding challenges"
        ],
        rounds: [
          {
            round: "Round 1: MCQ Blitz",
            description: "Rapid-fire multiple choice questions testing programming fundamentals",
            duration: "45 minutes",
            topics: ["Programming Language Syntax", "Data Structures Basics", "Algorithm Complexity", "OOP Concepts", "Debugging Skills"],
            format: "30 multiple choice questions with negative marking"
          },
          {
            round: "Round 2: Output Battle", 
            description: "Predict the output of given code snippets accurately",
            duration: "60 minutes",
            topics: ["Code Tracing", "Logic Analysis", "Memory Management", "Loop Execution", "Function Calls"],
            format: "20 code snippets with expected output prediction"
          },
          {
            round: "Round 3: Test Case Frenzy",
            description: "Write optimized code solutions for algorithmic problems",
            duration: "90 minutes", 
            topics: ["Data Structures Implementation", "Algorithm Design", "Optimization Techniques", "Edge Case Handling"],
            format: "5 coding problems with multiple test cases"
          }
        ],
        agenda: [
          "12:00 PM - 12:30 PM: Registration & Participant Check-in",
          "12:30 PM - 1:00 PM: Welcome Address & Rules Briefing",
          "1:00 PM - 1:45 PM: Round 1 - MCQ Blitz (45 minutes)",
          "1:45 PM - 2:00 PM: Break & Round 1 Results",
          "2:00 PM - 3:00 PM: Round 2 - Output Battle (60 minutes)",
          "3:00 PM - 3:15 PM: Break & Round 2 Results",
          "3:15 PM - 4:45 PM: Round 3 - Test Case Frenzy (90 minutes)",
          "4:45 PM - 5:30 PM: Final Evaluation & Results Compilation",
          "5:30 PM - 6:00 PM: Prize Distribution & Closing Ceremony"
        ],
        preparation: [
          "Review fundamental programming concepts in C/C++, Java, or Python",
          "Practice data structures: Arrays, Linked Lists, Stacks, Queues, Trees",
          "Study algorithms: Searching, Sorting, Graph Traversal, Dynamic Programming",
          "Solve problems on platforms like HackerRank, CodeChef, LeetCode",
          "Focus on time complexity analysis and code optimization"
        ],
        prizes: [
          "🏆 Champion: ₹8,000 + Trophy + Certificate + IEEE Student Membership",
          "🥈 First Runner-up: ₹5,000 + Certificate + Tech Books",
          "🥉 Second Runner-up: ₹3,000 + Certificate + Programming Kit",
          "🎯 Best Algorithm Award: ₹2,000 + Special Recognition",
          "⚡ Fastest Coder: ₹1,500 + Speed Programming Certificate"
        ],
        eligibility: [
          "Open to all undergraduate students",
          "Individual participation only",
          "Valid student ID required for registration",
          "Basic programming knowledge mandatory"
        ],
        judging: [
          "Round 1: Automated scoring based on correct answers",
          "Round 2: Manual verification of output predictions", 
          "Round 3: Automated testing with comprehensive test cases",
          "Final ranking based on cumulative performance across all rounds"
        ],
        highlights: [
          "Legacy event with 3+ years of successful editions",
          "Gateway to advanced competitive programming",
          "Alumni mentorship and industry connections",
          "Portfolio enhancement for placements and internships",
          "Recognition in department newsletter and website"
        ],
        contact: [
          "Event Coordinators: CSIT Student Council",
          "Faculty Mentor: Dr. [Faculty Name], HOD Computer Science",
          "Registration Support: csit.events@geu.ac.in",
          "Technical Queries: kindle.support@geu.ac.in"
        ]
      }
    },
    {
      id: 6,
      title: "IEEE MATRIX",
      date: "November 23, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "New Lab 1&2 CSIT",
      category: "hackathon",
      image: "/images/events/matrix.jpg",
      description: "IEEE MATRIX is a premier inter-domain innovation challenge hosted by IEEE GEU, where creativity meets cutting-edge technology. Participants collaborate in teams to solve real-world problems across four futuristic domains: IoT, Cloud Computing, AI & ML, and Generative AI",
      detailedContent: {
        overview: "IEEE MATRIX represents the convergence of multiple technological domains in a single competitive platform. This inter-domain innovation challenge pushes the boundaries of what's possible when IoT, Cloud Computing, AI & ML, and Generative AI technologies work together to solve complex real-world problems.",
        objectives: [
          "Demonstrate interdisciplinary problem-solving capabilities",
          "Foster innovation across multiple technology domains",
          "Build practical solutions using cutting-edge technologies",
          "Encourage collaboration between diverse technical backgrounds",
          "Showcase the power of integrated technology solutions"
        ],
        domains: [
          {
            name: "🌐 Internet of Things (IoT)",
            description: "Connected devices, sensor networks, and smart systems",
            technologies: ["Arduino", "Raspberry Pi", "ESP32", "MQTT", "LoRaWAN"],
            challenges: ["Smart City Solutions", "Industrial IoT", "Home Automation"]
          },
          {
            name: "☁️ Cloud Computing",
            description: "Scalable infrastructure, microservices, and distributed systems",
            technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Serverless"],
            challenges: ["Scalable Architectures", "Edge Computing", "Hybrid Cloud Solutions"]
          },
          {
            name: "🤖 AI & Machine Learning",
            description: "Intelligent systems, predictive analytics, and automation",
            technologies: ["TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "NLP"],
            challenges: ["Computer Vision", "Predictive Analytics", "Intelligent Automation"]
          },
          {
            name: "✨ Generative AI",
            description: "Content creation, language models, and creative applications",
            technologies: ["GPT", "DALL-E", "Stable Diffusion", "LangChain", "Hugging Face"],
            challenges: ["Content Generation", "Conversational AI", "Creative Applications"]
          }
        ],
        judging: [
          "Innovation and Creativity (25%)",
          "Technical Implementation (25%)",
          "Problem Solving Impact (20%)",
          "Integration of Multiple Domains (20%)",
          "Presentation and Demo (10%)"
        ],
        prizes: [
          "🏆 Grand Champion: ₹25,000 + Internship Offers + IEEE Membership",
          "🥈 Domain Excellence Awards (4): ₹10,000 each + Tech Gadgets",
          "🥉 Innovation Prize: ₹15,000 + Patent Filing Support",
          "🎯 Best Integration: ₹12,000 + Cloud Credits",
          "👥 All Participants: Certificates + Workshop Access"
        ],
        timeline: [
          "10:00 AM - 10:30 AM: Registration & Team Formation",
          "10:30 AM - 11:00 AM: Problem Statement Release & Domain Briefing",
          "11:00 AM - 2:00 PM: Development Phase (with lunch break)",
          "2:00 PM - 3:30 PM: Final Presentations & Demonstrations",
          "3:30 PM - 4:00 PM: Judging & Award Ceremony"
        ],
        requirements: [
          "Teams of 2-4 members with diverse skill sets",
          "Laptop with development environment",
          "Access to cloud platforms (credits provided)",
          "Hardware components (available on-site)"
        ],
        mentors: [
          {
            name: "Dr. Rajesh Kumar",
            designation: "IoT Research Head, IIT Delhi", 
            expertise: "Internet of Things & Embedded Systems"
          },
          {
            name: "Priya Sharma",
            designation: "Cloud Architect, Microsoft",
            expertise: "Cloud Computing & DevOps"
          },
          {
            name: "Arjun Patel",
            designation: "AI Engineer, NVIDIA",
            expertise: "Machine Learning & Computer Vision"
          }
        ]
      }
    },
    {
      id: 7,
      title: "DroneDroidZ",
      date: "September 14, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/drone.jpg",
      description: "Join the Future of Technology: Learn to Build Your Own Drone The IEEE Student Branch and IEI Student Chapter of Graphic Era is excited to invite you to an exclusive Drone Workshop on 14th September 2024!",
      detailedContent: {
        overview: "DroneDroidZ is an immersive hands-on workshop that takes participants through the complete journey of drone technology - from understanding aerodynamics and electronics to building, programming, and flying your own custom drone. This workshop bridges theoretical knowledge with practical implementation in the rapidly growing field of unmanned aerial vehicles.",
        objectives: [
          "Understand the fundamentals of drone technology and aerodynamics",
          "Learn about drone components, sensors, and flight controllers",
          "Build a fully functional drone from scratch",
          "Program autonomous flight patterns and missions",
          "Explore commercial applications of drone technology"
        ],
        curriculum: [
          "10:00 AM - 10:30 AM: Welcome & Introduction to Drone Technology",
          "10:30 AM - 11:30 AM: Aerodynamics & Flight Principles", 
          "11:30 AM - 12:30 PM: Drone Components & Hardware Assembly",
          "12:30 PM - 1:30 PM: Lunch & Networking Break",
          "1:30 PM - 2:30 PM: Flight Controller Programming",
          "2:30 PM - 3:30 PM: Sensor Integration & Autonomous Flight",
          "3:30 PM - 4:30 PM: Test Flights & Demonstrations",
          "4:30 PM - 5:00 PM: Applications & Career Opportunities"
        ],
        components: [
          "Quadcopter Frame & Propellers",
          "Flight Controller (Arduino-based)",
          "Brushless Motors & Electronic Speed Controllers",
          "LiPo Battery & Power Distribution",
          "GPS Module & IMU Sensors",
          "Camera Module for FPV",
          "Radio Transmitter & Receiver"
        ],
        skills: [
          "Electronics assembly and soldering",
          "Arduino programming and sensor integration", 
          "Flight dynamics and control systems",
          "Troubleshooting and debugging techniques",
          "Safety protocols and regulations"
        ],
        applications: [
          "🎬 Aerial Photography & Videography",
          "🚁 Search & Rescue Operations",
          "🌾 Agricultural Monitoring & Precision Farming",
          "📦 Delivery & Logistics Solutions",
          "🏗️ Infrastructure Inspection & Surveying",
          "🔒 Security & Surveillance Systems"
        ],
        deliverables: [
          "Fully assembled and programmed quadcopter drone",
          "Complete programming code and documentation",
          "Workshop manual with troubleshooting guide",
          "Certificate of completion from IEEE & IEI",
          "Access to online drone community and resources"
        ],
        prerequisites: [
          "Basic understanding of electronics (helpful but not required)",
          "Interest in robotics and automation",
          "Willingness to work with hardware components",
          "No prior drone experience necessary"
        ],
        instructors: [
          {
            name: "Capt. Vikram Singh",
            designation: "Drone Technology Expert & Former Air Force Pilot",
            expertise: "Flight Operations & Safety Protocols"
          },
          {
            name: "Rohit Sharma",
            designation: "Robotics Engineer, Ideaforge Technology",
            expertise: "Drone Hardware & Programming"
          }
        ]
      }
    },
    {
      id: 8,
      title: "DevOps",
      date: "May 04, 2024",
      time: "10:00 AM onwards",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/devops.jpg",
      description: "From vision to reality: Impacting lives through development at Graphic Era Deemed to be University",
      detailedContent: {
        overview: "This comprehensive DevOps workshop bridges the gap between development and operations, teaching participants how to implement continuous integration, continuous deployment, and infrastructure automation. Learn industry-standard tools and practices that enable rapid, reliable software delivery.",
        objectives: [
          "Understand DevOps culture, practices, and methodology",
          "Master CI/CD pipeline design and implementation",
          "Learn containerization with Docker and orchestration with Kubernetes",
          "Implement infrastructure as code and monitoring solutions",
          "Gain hands-on experience with industry-standard DevOps tools"
        ],
        curriculum: [
          "10:00 AM - 10:30 AM: Welcome & DevOps Fundamentals",
          "10:30 AM - 11:30 AM: Version Control with Git & CI/CD Concepts",
          "11:30 AM - 12:30 PM: Docker Containerization Hands-on",
          "12:30 PM - 1:30 PM: Lunch Break",
          "1:30 PM - 2:30 PM: Kubernetes Orchestration & Deployment",
          "2:30 PM - 3:30 PM: Infrastructure as Code with Terraform",
          "3:30 PM - 4:30 PM: Monitoring & Observability",
          "4:30 PM - 5:00 PM: Career Paths & Industry Insights"
        ],
        tools: [
          {
            category: "Version Control & CI/CD",
            tools: ["Git", "GitHub Actions", "Jenkins", "GitLab CI"]
          },
          {
            category: "Containerization & Orchestration", 
            tools: ["Docker", "Kubernetes", "Docker Compose", "Helm"]
          },
          {
            category: "Infrastructure & Cloud",
            tools: ["Terraform", "AWS", "Ansible", "Vagrant"]
          },
          {
            category: "Monitoring & Observability",
            tools: ["Prometheus", "Grafana", "ELK Stack", "Datadog"]
          }
        ],
        projects: [
          "Automated CI/CD pipeline for web application",
          "Containerized microservices deployment",
          "Infrastructure provisioning with Terraform",
          "Complete monitoring and alerting setup"
        ],
        benefits: [
          "Industry-recognized DevOps skills and certification",
          "Hands-on experience with enterprise-grade tools",
          "Understanding of modern software delivery practices",
          "Career advancement in DevOps and cloud engineering",
          "Network with DevOps professionals and recruiters"
        ],
        speakers: [
          {
            name: "Suresh Kumar",
            designation: "Principal DevOps Engineer, Netflix",
            expertise: "Large-scale Infrastructure & Automation"
          },
          {
            name: "Rakesh Singh",
            designation: "Cloud Solution Architect, Microsoft Azure",
            expertise: "Cloud Infrastructure & Kubernetes"
          }
        ]
      }
    },
    {
      id: 9,
      title: "IEEE Student Project Competition",
      date: "October 15, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "CSIT",
      category: "competition",
      image: "/images/events/project.jpg",
      description: "Showcase your innovative projects and win exciting prizes.",
      detailedContent: {
        overview: "The IEEE Student Project Competition is a platform for students to showcase their innovative engineering and technology projects. This competition encourages creativity, technical excellence, and practical problem-solving while providing opportunities for recognition and career advancement.",
        objectives: [
          "Promote innovation and creativity in engineering projects",
          "Provide platform for students to showcase technical skills",
          "Encourage practical application of theoretical knowledge",
          "Foster collaboration and knowledge sharing among peers",
          "Connect students with industry professionals and mentors"
        ],
        categories: [
          {
            name: "🤖 Robotics & Automation",
            description: "Autonomous systems, industrial automation, and robotic applications"
          },
          {
            name: "💻 Software & Web Development",
            description: "Mobile apps, web applications, and software solutions"
          },
          {
            name: "🔋 Electronics & IoT",
            description: "Embedded systems, IoT devices, and electronic innovations"
          },
          {
            name: "🧠 AI & Machine Learning",
            description: "Intelligent systems, data analytics, and ML applications"
          },
          {
            name: "🌱 Sustainability & Green Tech",
            description: "Environmental solutions and sustainable technology"
          }
        ],
        timeline: [
          "10:00 AM - 10:30 AM: Registration & Setup",
          "10:30 AM - 12:00 PM: Project Presentations (Round 1)",
          "12:00 PM - 1:00 PM: Lunch & Networking",
          "1:00 PM - 3:00 PM: Demo Sessions & Technical Evaluation",
          "3:00 PM - 4:00 PM: Final Presentations (Top 10 Projects)",
          "4:00 PM - 5:00 PM: Judging & Award Ceremony"
        ],
        judging: [
          "Innovation & Originality (25%)",
          "Technical Implementation (25%)",
          "Problem Solving Impact (20%)",
          "Presentation Quality (15%)",
          "Commercial Viability (15%)"
        ],
        prizes: [
          "🏆 Grand Prize Winner: ₹25,000 + Internship Opportunity + IEEE Membership",
          "🥈 Category Winners (5): ₹10,000 each + Recognition Certificate",
          "🥉 Runner-up Awards (5): ₹5,000 each + Participation Certificate",
          "🎯 Best Innovation: ₹15,000 + Patent Filing Support",
          "👥 People's Choice: ₹8,000 + Public Recognition Award"
        ],
        requirements: [
          "Original project developed by student team (max 4 members)",
          "Working prototype or demo ready for presentation",
          "Project documentation and source code",
          "15-minute presentation + 10-minute Q&A session"
        ],
        benefits: [
          "Industry exposure and networking opportunities",
          "Feedback from experienced engineers and researchers",
          "Potential for project commercialization and startup funding",
          "Portfolio enhancement for academic and career growth",
          "Publication opportunities in IEEE conferences"
        ],
        judges: [
          {
            name: "Dr. Anil Sharma",
            designation: "Chief Technology Officer, Tech Mahindra",
            expertise: "Emerging Technologies & Innovation"
          },
          {
            name: "Prof. Meera Patel",
            designation: "IEEE Senior Member & Research Director",
            expertise: "Academic Research & Technology Transfer"
          },
          {
            name: "Rajesh Gupta",
            designation: "Startup Founder & Angel Investor",
            expertise: "Product Development & Entrepreneurship"
          }
        ]
      }
    },
    {
      id: 10,
      title: "Prompt Engineering",
      date: "May 04, 2024",
      time: "10:00 AM Onwards",
      location: "Seminar,CSIT",
      category: "workshop",
      image: "/images/events/prompt.jpg",
      description: "Building dreams, one blueprint at a time at Graphic Era Deemed to be University.",
      detailedContent: {
        overview: "Prompt Engineering workshop is designed to master the art and science of communicating effectively with AI systems. As AI becomes increasingly integrated into our daily workflows, the ability to craft precise, effective prompts has become a crucial skill for maximizing AI productivity and achieving desired outcomes.",
        objectives: [
          "Master the fundamentals of prompt design and optimization",
          "Learn advanced prompting techniques for different AI models",
          "Understand the psychology and mechanics behind AI responses",
          "Develop systematic approaches for prompt iteration and refinement",
          "Build practical skills for real-world AI applications"
        ],
        curriculum: [
          "10:00 AM - 10:30 AM: Welcome & AI Communication Fundamentals",
          "10:30 AM - 11:30 AM: Anatomy of Effective Prompts",
          "11:30 AM - 12:30 PM: Advanced Prompting Techniques & Strategies",
          "12:30 PM - 1:30 PM: Lunch Break & Networking",
          "1:30 PM - 2:30 PM: Hands-on Practice with Different AI Models",
          "2:30 PM - 3:30 PM: Domain-Specific Applications & Use Cases",
          "3:30 PM - 4:30 PM: Prompt Optimization & Testing Methods",
          "4:30 PM - 5:00 PM: Future Trends & Career Opportunities"
        ],
        techniques: [
          {
            method: "Zero-Shot Prompting",
            description: "Getting results without providing examples",
            useCase: "Quick queries and general information requests"
          },
          {
            method: "Few-Shot Learning",
            description: "Providing examples to guide AI behavior",
            useCase: "Pattern recognition and consistent formatting"
          },
          {
            method: "Chain-of-Thought",
            description: "Breaking down complex problems step-by-step",
            useCase: "Mathematical problems and logical reasoning"
          },
          {
            method: "Role-Based Prompting",
            description: "Assigning specific roles or personas to AI",
            useCase: "Creative writing and specialized expertise"
          },
          {
            method: "Template Engineering",
            description: "Creating reusable prompt frameworks",
            useCase: "Consistent workflows and batch processing"
          }
        ],
        applications: [
          "💼 Business & Productivity: Email drafting, report generation, meeting summaries",
          "🎨 Creative Work: Content creation, brainstorming, creative writing assistance",
          "🔬 Research & Analysis: Data interpretation, literature reviews, hypothesis generation",
          "📚 Education & Learning: Personalized tutoring, curriculum development, assessment creation",
          "💻 Software Development: Code generation, debugging assistance, documentation",
          "🎯 Marketing & Sales: Ad copy creation, customer persona development, campaign strategies"
        ],
        tools: [
          "ChatGPT (GPT-3.5/4) for conversational AI",
          "Claude for analytical and creative tasks",
          "Bard for research and information synthesis",
          "Midjourney for image generation prompting",
          "GitHub Copilot for code-specific prompting",
          "Custom API integrations and workflow automation"
        ],
        skills: [
          "Prompt structure and syntax optimization",
          "Context window management and information organization", 
          "Bias detection and mitigation in AI responses",
          "Multi-modal prompting for text, image, and code generation",
          "Prompt chaining for complex multi-step tasks",
          "Performance measurement and prompt A/B testing"
        ],
        projects: [
          "Personal AI Assistant with custom prompt library",
          "Automated content generation workflow",
          "Customer service chatbot with optimized responses",
          "Research assistant for academic paper analysis",
          "Creative writing companion with style adaptation"
        ],
        career: [
          "🤖 AI Prompt Engineer",
          "💼 AI Product Manager",
          "✍️ AI Content Strategist",
          "🔧 AI Workflow Consultant",
          "📊 AI Training Data Specialist",
          "🎯 Conversational AI Designer"
        ],
        deliverables: [
          "Comprehensive prompt engineering toolkit and templates",
          "Personal prompt library with 50+ tested prompts",
          "Best practices guide for different AI platforms",
          "Certificate of completion from IEEE GEU",
          "Access to ongoing AI community and resources"
        ],
        instructors: [
          {
            name: "Dr. Priya Malhotra",
            designation: "AI Research Scientist, OpenAI",
            expertise: "Large Language Models & Natural Language Processing"
          },
          {
            name: "Arjun Kapoor",
            designation: "Senior AI Engineer, Microsoft",
            expertise: "Conversational AI & Prompt Optimization"
          }
        ]
      }
    },
    {
      id: 11,
      title: "Cyber Security",
      date: "August 24, 2024",
      time: "02:00 PM 04:00 PM",
      location: "New Lab 1&2 CSIT",
      category: "workshop",
      image: "/images/events/cyber.jpg",
      description: "Ready to dive into the world of cybersecurity? Join us at Cryptic: A Cybersecurity Workshop where we'll explore the essentials of protecting your digital life.",
      detailedContent: {
        overview: "Cryptic: A Cybersecurity Workshop is designed to equip participants with essential cybersecurity knowledge and practical skills to protect digital assets in an increasingly connected world. This hands-on workshop covers everything from basic security principles to advanced threat detection and incident response.",
        objectives: [
          "Understand fundamental cybersecurity principles and threat landscape",
          "Learn to identify and mitigate common security vulnerabilities",
          "Master essential security tools and techniques",
          "Develop incident response and forensic analysis skills",
          "Build a comprehensive security mindset for digital protection"
        ],
        curriculum: [
          "2:00 PM - 2:20 PM: Welcome & Cybersecurity Threat Landscape",
          "2:20 PM - 2:50 PM: Network Security & Firewall Configuration",
          "2:50 PM - 3:20 PM: Web Application Security & Penetration Testing",
          "3:20 PM - 3:50 PM: Cryptography & Secure Communication",
          "3:50 PM - 4:00 PM: Career Paths & Certification Guidance"
        ],
        topics: [
          {
            module: "🔒 Network Security",
            description: "Firewall configuration, intrusion detection, and network monitoring",
            tools: ["Wireshark", "Nmap", "pfSense", "Snort"]
          },
          {
            module: "🌐 Web Application Security", 
            description: "OWASP Top 10, SQL injection, XSS, and secure coding practices",
            tools: ["Burp Suite", "OWASP ZAP", "Metasploit", "SQLmap"]
          },
          {
            module: "🔐 Cryptography",
            description: "Encryption algorithms, digital signatures, and PKI",
            tools: ["OpenSSL", "GPG", "Hashcat", "John the Ripper"]
          },
          {
            module: "🚨 Incident Response",
            description: "Digital forensics, malware analysis, and threat hunting",
            tools: ["Autopsy", "Volatility", "YARA", "Splunk"]
          }
        ],
        practicals: [
          "Setting up a secure network with proper firewall rules",
          "Conducting penetration testing on vulnerable web applications",
          "Implementing encryption for secure data transmission",
          "Analyzing suspicious network traffic and malware samples",
          "Creating an incident response plan for organization"
        ],
        skills: [
          "Vulnerability Assessment & Penetration Testing",
          "Security Information and Event Management (SIEM)",
          "Digital Forensics & Incident Response",
          "Cryptographic Implementation & Key Management",
          "Security Policy Development & Risk Assessment"
        ],
        certifications: [
          "CompTIA Security+ (Entry Level)",
          "Certified Ethical Hacker (CEH)", 
          "CISSP (Advanced Security Professional)",
          "GCIH (GIAC Certified Incident Handler)",
          "OSCP (Offensive Security Certified Professional)"
        ],
        career: [
          "🛡️ Cybersecurity Analyst",
          "🔍 Penetration Tester",
          "🚨 Incident Response Specialist",
          "🔒 Security Architect",
          "📋 Compliance & Risk Manager",
          "🕵️ Digital Forensics Investigator"
        ],
        deliverables: [
          "Comprehensive cybersecurity toolkit and resources",
          "Hands-on lab exercises and case studies",
          "Certificate of completion from IEEE GEU",
          "Career guidance and certification roadmap",
          "Access to cybersecurity community and job portal"
        ],
        instructors: [
          {
            name: "Col. Amit Verma (Retd.)",
            designation: "Cybersecurity Consultant & Former Army Cyber Ops",
            expertise: "Network Security & Incident Response"
          },
          {
            name: "Sneha Agarwal",
            designation: "Senior Security Analyst, Deloitte",
            expertise: "Web Application Security & Penetration Testing"
          }
        ]
      }
    },
    {
      id: 12,
      title: "Web Development Bootcamp",
      date: "August 12, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Seminar, CSIT",
      category: "workshop",
      image: "/images/events/webdev.jpg",
      description: "Learn modern web development techniques and frameworks from industry experts.",
      detailedContent: {
        overview: "Web Development Bootcamp is an intensive hands-on workshop designed to take participants from basic web concepts to building full-stack applications. This comprehensive bootcamp covers modern web technologies, frameworks, and best practices used in the industry today.",
        objectives: [
          "Master HTML5, CSS3, and modern JavaScript (ES6+)",
          "Build responsive and interactive web applications",
          "Learn popular frameworks like React.js and Node.js",
          "Understand backend development and database integration",
          "Deploy applications to cloud platforms and implement DevOps practices"
        ],
        curriculum: [
          "10:00 AM - 10:30 AM: Registration & Setup Development Environment",
          "10:30 AM - 11:30 AM: HTML5 & CSS3 Fundamentals + Responsive Design",
          "11:30 AM - 12:30 PM: JavaScript ES6+ & DOM Manipulation",
          "12:30 PM - 1:00 PM: Lunch Break",
          "1:00 PM - 2:00 PM: React.js Components & State Management",
          "2:00 PM - 2:45 PM: Backend with Node.js & API Development",
          "2:45 PM - 3:00 PM: Deployment & Portfolio Showcase"
        ],
        technologies: [
          {
            category: "Frontend Technologies",
            skills: ["HTML5 Semantic Elements", "CSS3 Grid & Flexbox", "JavaScript ES6+", "React.js", "Responsive Design"],
            tools: ["VS Code", "Chrome DevTools", "Figma", "Bootstrap"]
          },
          {
            category: "Backend Technologies", 
            skills: ["Node.js", "Express.js", "RESTful APIs", "MongoDB", "Authentication"],
            tools: ["Postman", "MongoDB Compass", "JWT", "bcrypt"]
          },
          {
            category: "Development Tools",
            skills: ["Git Version Control", "Package Management", "Build Tools", "Deployment"],
            tools: ["npm/yarn", "Webpack", "Netlify", "Vercel", "Heroku"]
          }
        ],
        projects: [
          {
            project: "Portfolio Website",
            description: "Personal portfolio with responsive design and animations",
            tech: ["HTML5", "CSS3", "JavaScript"]
          },
          {
            project: "Todo Application",
            description: "Interactive task management app with local storage",
            tech: ["React.js", "Local Storage", "CSS Modules"]
          },
          {
            project: "Full-Stack Blog",
            description: "Complete blogging platform with user authentication",
            tech: ["React.js", "Node.js", "MongoDB", "JWT"]
          }
        ],
        skills: [
          "Frontend development with modern frameworks",
          "Backend API development and database design",
          "Responsive web design and mobile-first approach",
          "Version control with Git and collaborative development",
          "Web performance optimization and SEO best practices",
          "Cloud deployment and CI/CD pipeline setup"
        ],
        career: [
          "💻 Frontend Developer",
          "🔧 Backend Developer", 
          "🌐 Full-Stack Developer",
          "📱 Mobile App Developer (React Native)",
          "🎨 UI/UX Developer",
          "☁️ DevOps Engineer"
        ],
        deliverables: [
          "3 complete web projects in your portfolio",
          "Source code repositories on GitHub",
          "Certificate of completion from IEEE GEU",
          "Industry-standard development setup guide",
          "Continued mentorship and job placement assistance"
        ],
        prerequisites: [
          "Basic computer skills and familiarity with internet",
          "Laptop with internet connection",
          "Willingness to learn and practice coding",
          "No prior programming experience required"
        ],
        instructors: [
          {
            name: "Karan Singh",
            designation: "Senior Full-Stack Developer, Flipkart",
            expertise: "React.js, Node.js & System Design"
          },
          {
            name: "Pooja Sharma",
            designation: "Frontend Lead, Paytm",
            expertise: "Modern Frontend Technologies & UX"
          },
          {
            name: "Rahul Gupta",
            designation: "DevOps Engineer, Amazon",
            expertise: "Cloud Deployment & CI/CD"
          }
        ]
      }
    },

  ];

  // Filter events based on category and search query
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = filter === 'all' || event.category === filter;
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured events
  const featuredEvents = allEvents.filter(event => event.featured);
  
  // Upcoming events
  const upcomingEvents = allEvents.filter(event => event.upcoming);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Add stagger animation for card groups
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <Layout>
      <div className="overflow-hidden">
        <Head>
          <title>IEEE Events GEU - Technical Workshops, Hackathons & Conferences | Graphic Era University IEEE</title>
          <meta name="description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities. Join cutting-edge technology events hosted by IEEE Club at Graphic Era University." />
          <meta name="keywords" content="IEEE Events GEU, IEEE Workshops GEU, IEEE Hackathons, IEEE Conferences GEU, Technical Events GEU, IEEE Club Events, Graphic Era University IEEE Events, IEEE Competitions GEU, Technology Workshops GEU" />
          <meta name="author" content="IEEE Club - Graphic Era University" />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="IEEE Events GEU - Technical Workshops, Hackathons & Conferences" />
          <meta property="og:description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities. Join cutting-edge technology events hosted by IEEE Club at Graphic Era University." />
          <meta property="og:image" content="https://your-domain.com/images/hero/IEEE_hero.jpg" />
          <meta property="og:url" content="https://your-domain.com/events" />
          
          {/* Twitter Meta Tags */}
          <meta name="twitter:title" content="IEEE Events GEU - Technical Workshops, Hackathons & Conferences" />
          <meta name="twitter:description" content="Discover IEEE events at GEU - technical workshops, hackathons, conferences, and networking opportunities." />
          <meta name="twitter:image" content="https://your-domain.com/images/hero/IEEE_hero.jpg" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://your-domain.com/events" />
          
          {/* Structured Data for Events */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "IEEE Events at GEU",
                "description": "Technical workshops, hackathons, conferences, and networking events hosted by IEEE Club at Graphic Era University",
                "url": "https://your-domain.com/events",
                "itemListElement": allEvents.map((event, index) => ({
                  "@type": "Event",
                  "position": index + 1,
                  "name": event.title,
                  "description": event.description,
                  "startDate": event.date,
                  "location": {
                    "@type": "Place",
                    "name": event.location
                  },
                  "organizer": {
                    "@type": "Organization",
                    "name": "IEEE Club - GEU"
                  },
                  "image": `https://your-domain.com${event.image}`,
                  "url": `https://your-domain.com/events/${event.id}`
                }))
              })
            }}
          />
        </Head>

        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative flex items-center min-h-screen overflow-hidden">
          {/* Multi-layer Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/30"></div>
          
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute inset-0"
          >
            <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-blue-500/10 blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 delay-1000 rounded-full top-40 right-20 bg-purple-500/10 blur-2xl animate-pulse"></div>
            <div className="absolute w-40 h-40 rounded-full bottom-40 left-20 bg-cyan-500/10 blur-xl animate-pulse delay-2000"></div>
          </motion.div>
          
          {/* Circuit Pattern Overlay */}
          {/* <div className="absolute inset-0 bg-[url('/images/hero/circuit-pattern.png')] opacity-5"></div> */}
          
          <div className="container relative z-10 px-6 mx-auto">
            <motion.div 
              className="max-w-5xl mx-auto space-y-8 text-center text-white"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <FaRocket className="mr-2 text-yellow-400" />
                <span className="text-sm font-medium">• Join the Innovation</span>
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="text-white">IEEE</span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text">
                  Events
                </span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  & Workshops
                </span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300 md:text-2xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                Discover cutting-edge workshops, conferences, hackathons, and networking opportunities. Join us in shaping the future of technology.
              </motion.p>
              
              {/* Enhanced Search Bar */}
              <motion.div 
                className="max-w-2xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 transition duration-300 rounded-full opacity-25 bg-gradient-to-r from-blue-500 to-purple-600 blur group-hover:opacity-40"></div>
                  <div className="relative p-1 border rounded-full bg-white/10 backdrop-blur-lg border-white/20">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-3">
                        <FaSearch className="text-lg text-white/70" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search events, workshops, hackathons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-3 text-lg text-white bg-transparent placeholder-white/50 focus:outline-none"
                      />
                      <button className="flex-shrink-0 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg">
                        <FaFilter className="mr-2" />
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid max-w-2xl grid-cols-3 gap-6 pt-8 mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-400">Annual Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">10K+</div>
                  <div className="text-sm text-gray-400">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">10+</div>
                  <div className="text-sm text-gray-400">Industry Partners</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/*Scroll Indicator */}
          <motion.div 
            className="absolute flex flex-col items-center transform -translate-x-1/2 bottom-1 left-1/2 text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="mb-2 text-sm font-medium">Explore Events</span>
            <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
              <motion.div
                className="w-1 h-3 mt-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

      <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 mx-auto">
          {/* Event Filters - Enhanced UI */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {['all', 'workshop', 'conference', 'hackathon', 'webinar', 'competition'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category 
                      ? 'bg-ieee-blue text-white shadow-lg shadow-blue-500/20 scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Events' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </div>
          
          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && filter === 'all' && searchQuery === '' && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h2 className="mb-2 text-3xl font-bold text-gray-900">🚀 Upcoming Events</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                <p className="mt-4 text-gray-600">Don't miss out on these exciting upcoming events!</p>
              </motion.div>
              
              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={fadeIn}
                    className="relative group"
                  >
                    <div className="absolute inset-0 transition-opacity bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80"></div>
                    <div className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-green-100 shadow-lg rounded-2xl hover:shadow-2xl group-hover:-translate-y-2">
                      {/* Event Badge */}
                      <div className="absolute z-10 top-4 right-4">
                        <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-green-500 to-blue-600 animate-pulse">
                          ✨ UPCOMING
                        </span>
                      </div>
                      
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                          {event.title}
                        </h3>
                        
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-gray-600">
                            <FaCalendar className="mr-2 text-green-500" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaClock className="mr-2 text-blue-500" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                          {event.description}
                        </p>
                        
                        {event.registrationLink && (
                          <div className="flex gap-2">
                            <a 
                              href={event.registrationLink}
                              className="flex items-center justify-center flex-1 px-4 py-3 font-semibold text-center text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 hover:shadow-lg group-hover:shadow-2xl"
                            >
                              <span>Join Quiz</span>
                              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Featured Events Section */}
          {featuredEvents.length > 0 && filter === 'all' && searchQuery === '' && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h2 className="mb-2 text-3xl font-bold text-gray-900">Featured Events</h2>
                <div className="w-20 h-1.5 bg-ieee-blue rounded-full"></div>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {featuredEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    index={index} 
                    featured={true}
                  />
                ))}
              </motion.div>
            </div>
          )}
          
          {/* All Events Section */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-10"
            >
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                  {filter === 'all' ? 'All Events' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Events`}
                </h2>
                <div className="w-20 h-1.5 bg-ieee-blue rounded-full"></div>
              </div>
              
              {filteredEvents.length > 0 && (
                <p className="font-medium text-gray-500">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </p>
              )}
            </motion.div>
            
            {filteredEvents.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={filter + searchQuery}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center bg-white shadow-lg rounded-2xl"
              >
                <div className="mb-6">
                  <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No events found</h3>
                <p className="mb-8 text-gray-500">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-8 py-3 text-white transition-colors rounded-full shadow-lg bg-ieee-blue hover:bg-blue-700 hover:shadow-blue-500/30"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Newsletter signup - New section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-10 mt-24 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Stay Updated on Future Events</h2>
              <p className="mb-6 text-gray-600">
                Subscribe to our newsletter and never miss an upcoming workshop, conference or tech talk.
              </p>
              <div className="flex flex-col max-w-lg gap-3 mx-auto sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg shadow-md bg-ieee-blue hover:bg-blue-700 hover:shadow-blue-500/30">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </Layout>
  );
}

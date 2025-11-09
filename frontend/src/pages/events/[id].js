import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaArrowLeft, 
  FaShare, 
  FaHeart,
  FaCheckCircle,
  FaTrophy,
  FaGraduationCap,
  FaCode,
  FaStar
} from 'react-icons/fa';
import Layout from '@/components/Layout';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Enhanced events data - same as events.js
  const allEvents = [
    {
      id: 13,
      title: "Kindle Jr 4.0",
      date: "October 14, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "CSIT Labs",
      category: "competition",
      image: "/images/events/kindlejunior4.0.png",
      description: "The ultimate coding competition is back! Test your programming knowledge, algorithms, and problem-solving skills in this exciting multi-round challenge.",
      featured: true,
      attendees: 150,
      difficulty: "All Levels",
      tags: ["Coding", "Competition", "Programming"],
      upcoming: false,
      detailedContent: {
        overview: "Kindle Jr 4.0 is the flagship coding competition that brings together programming enthusiasts from across the university. This multi-round challenge tests participants' knowledge in algorithms, data structures, programming languages, and problem-solving techniques.",
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
          process: "Register through the competition portal",
          deadline: "October 13, 2025",
          fee: "Entry Fee: ₹99 / per person (₹49 for first 50 IEEE members)",
          requirements: ["Valid student ID", "Basic programming knowledge"]
        }
      }
    },
    {
      id: 1,
      title: "Machine Learning Workshop",
      date: "May 23, 2024",
      time: "11:30 Am Onwards",
      location: "Main Campus Auditorium",
      category: "workshop",
      image: "/images/events/ai-workshop.jpg",
      description: "Hands-on session with industry experts on implementing ML models using Python, scikit-learn, and real-world datasets.",
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
      date: "May 29, 2024",
      time: "8:00 AM",
      location: "Silver Convention Center",
      category: "conference",
      image: "/images/events/aws.jpg",
      description: "The AWS Cloud Quest Tournament and Jam Skill Builder Program is a hands-on, gamified learning experience designed to equip students with real-world cloud computing skills.",
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
      title: "IEEE MATRIX",
      date: "November 23, 2024",
      time: "9:00 AM",
      location: "Innovation Hub",
      category: "hackathon",
      image: "/images/events/matrix.jpg",
      description: "Premier inter-domain innovation challenge where creativity meets cutting-edge technology across IoT, Cloud Computing, AI & ML, and Generative AI domains.",
      featured: true,
      attendees: 200,
      difficulty: "Advanced",
      tags: ["Innovation", "IoT", "AI", "Cloud"],
      detailedContent: {
        overview: "IEEE MATRIX is the premier inter-domain innovation challenge where creativity meets cutting-edge technology. Teams will collaborate to build groundbreaking solutions addressing real-world challenges across multiple domains including FinTech, HealthTech, EdTech, and Sustainability.",
        objectives: [
          "Foster innovation and creative problem-solving skills",
          "Encourage collaboration between diverse skill sets",
          "Build functional prototypes addressing real-world problems",
          "Network with industry professionals and potential employers",
          "Showcase technical skills to judges and sponsors"
        ],
        domains: [
          "🌐 IoT: Internet of Things and Smart Devices",
          "☁️ Cloud Computing: Scalable Cloud Solutions",
          "🤖 AI & ML: Artificial Intelligence Applications",
          "✨ Generative AI: Creative AI Solutions"
        ],
        timeline: [
          "Day 1: 9:00 AM - Problem Statements Release & Team Formation",
          "Day 1: 10:00 AM - 11:59 PM - Development Phase Begins",
          "Day 2: 12:00 AM - 8:00 PM - Continued Development",
          "Day 2: 8:00 PM - 10:00 PM - Final Submissions & Presentations",
          "Day 2: 10:00 PM - 11:00 PM - Judging & Award Ceremony"
        ],
        prizes: [
          "🏆 Grand Prize: ₹50,000 + Internship Opportunities",
          "🥈 Second Place: ₹30,000 + Tech Gadgets",
          "🥉 Third Place: ₹20,000 + Certificates",
          "🎯 Domain Winners: ₹10,000 each + Recognition"
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
        ]
      }
    },
    {
      id: 4,
      title: "DroneDroidZ Workshop",
      date: "September 14, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Labs",
      category: "workshop",
      image: "/images/events/drone.jpg",
      description: "Learn to build your own drone from scratch! Immersive hands-on workshop covering aerodynamics, electronics, programming, and autonomous flight.",
      featured: true,
      attendees: 80,
      difficulty: "Intermediate",
      tags: ["Drones", "Electronics", "Programming", "Robotics"],
      detailedContent: {
        overview: "Join the Future of Technology: Learn to Build Your Own Drone. The IEEE Student Branch and IEI Student Chapter of Graphic Era is excited to invite you to an exclusive Drone Workshop!",
        objectives: [
          "Understand drone technology and aerodynamics principles",
          "Learn hands-on drone assembly and component integration",
          "Master flight control programming and autonomous navigation",
          "Explore real-world applications in various industries",
          "Build a functional drone from scratch"
        ],
        modules: [
          "Module 1: Drone Fundamentals & Aerodynamics",
          "Module 2: Electronic Components & Wiring",
          "Module 3: Flight Controller Programming",
          "Module 4: Assembly & Testing",
          "Module 5: Autonomous Flight & Applications"
        ],
        schedule: [
          "9:00 AM - 10:30 AM: Introduction to Drone Technology",
          "10:30 AM - 12:00 PM: Components Overview & Selection",
          "12:00 PM - 1:00 PM: Lunch Break",
          "1:00 PM - 3:00 PM: Hands-on Assembly Session",
          "3:00 PM - 4:30 PM: Programming & Flight Testing",
          "4:30 PM - 5:00 PM: Demo Flights & Wrap-up"
        ],
        takeaways: [
          "Complete assembled drone (yours to keep)",
          "Comprehensive workshop materials and guides",
          "Certificate of completion",
          "Access to online drone community",
          "Future workshop discounts"
        ],
        prerequisites: [
          "Basic understanding of electronics",
          "Interest in robotics and automation",
          "No prior drone experience required",
          "Enthusiasm for hands-on learning"
        ],
        applications: [
          "Aerial Photography & Videography",
          "Agricultural Monitoring & Spraying",
          "Search & Rescue Operations",
          "Package Delivery Systems",
          "Environmental Monitoring"
        ]
      }
    },
    {
      id: 5,
      title: "IEEE Student Project Competition",
      date: "October 15, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Main Auditorium",
      category: "competition",
      image: "/images/events/project.jpg",
      description: "Showcase your innovative projects across Robotics, AI/ML, IoT, Software Development, and Sustainability with exciting prizes and industry recognition.",
      featured: true,
      attendees: 300,
      difficulty: "All Levels",
      tags: ["Projects", "Innovation", "Research", "Competition"],
      detailedContent: {
        overview: "IEEE Student Project Competition is the premier platform for students to showcase their innovative projects and research work. This competition encourages creativity, technical excellence, and real-world problem solving across multiple engineering and technology domains.",
        objectives: [
          "Showcase innovative student projects and research",
          "Encourage practical application of theoretical knowledge",
          "Promote interdisciplinary collaboration and learning",
          "Provide platform for industry recognition and networking",
          "Foster entrepreneurial spirit and innovation mindset"
        ],
        categories: [
          "🤖 Robotics & Automation",
          "🧠 AI & Machine Learning",
          "🌐 IoT & Embedded Systems",
          "💻 Software Development & Apps",
          "🌱 Sustainability & Green Technology"
        ],
        timeline: [
          "10:00 AM - 11:00 AM: Registration & Setup",
          "11:00 AM - 1:00 PM: First Round Presentations",
          "1:00 PM - 2:00 PM: Lunch & Networking",
          "2:00 PM - 4:00 PM: Second Round Presentations",
          "4:00 PM - 5:30 PM: Final Round & Judging",
          "5:30 PM - 6:00 PM: Award Ceremony"
        ],
        judging: [
          "Innovation & Creativity (25%)",
          "Technical Implementation (25%)",
          "Real-world Impact & Feasibility (25%)",
          "Presentation & Communication (25%)"
        ],
        prizes: [
          "🏆 Overall Winner: ₹25,000 + Industry Mentorship",
          "🥈 Runner-up: ₹15,000 + Patent Filing Support",
          "🥉 Third Place: ₹10,000 + Incubation Opportunity",
          "🎯 Category Winners: ₹5,000 each + Certificates",
          "🌟 Best Innovation: Special Recognition + ₹3,000"
        ],
        requirements: [
          "Original project work by student team",
          "Working prototype or demonstration",
          "Detailed project report and presentation",
          "Maximum team size of 4 members"
        ],
        benefits: [
          "Industry exposure and networking opportunities",
          "Feedback from expert judges and mentors",
          "Potential funding and incubation support",
          "Patent filing guidance for innovative projects",
          "Publication opportunities in IEEE journals"
        ]
      }
    }
  ];

  useEffect(() => {
    if (id) {
      const foundEvent = allEvents.find(event => event.id.toString() === id);
      setEvent(foundEvent);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link href="/events">
            <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Back to Events
            </span>
          </Link>
        </div>
      </Layout>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      workshop: 'bg-green-100 text-green-800',
      competition: 'bg-blue-100 text-blue-800',
      hackathon: 'bg-purple-100 text-purple-800',
      conference: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      workshop: <FaGraduationCap />,
      competition: <FaTrophy />,
      hackathon: <FaCode />,
      conference: <FaUsers />
    };
    return icons[category] || <FaStar />;
  };

  return (
    <Layout>
      <Head>
        <title>{event.title} | IEEE GEU Events</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={`${event.title} | IEEE GEU Events`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={`https://geuieee.com${event.image}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-6 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Button */}
              <Link href="/events">
                <motion.div
                  className="inline-flex items-center text-white/80 hover:text-white mb-8 cursor-pointer group"
                  whileHover={{ x: -5 }}
                >
                  <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Events</span>
                </motion.div>
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(event.category)} bg-white/10 text-white border border-white/20`}>
                      <span className="mr-2">{getCategoryIcon(event.category)}</span>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <span className="text-yellow-400 text-sm font-semibold">
                      {event.difficulty}
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {event.title}
                  </h1>

                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center text-blue-200">
                      <FaCalendar className="mr-3 text-lg" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-blue-200">
                      <FaClock className="mr-3 text-lg" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-blue-200">
                      <FaMapMarkerAlt className="mr-3 text-lg" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-blue-200">
                      <FaUsers className="mr-3 text-lg" />
                      <span>{event.attendees}+ Attendees</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {event.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShare className="inline mr-2" />
                      Share Event
                    </motion.button>
                  </div>
                </div>

                {/* Event Image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Overview */}
              {event.detailedContent?.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {event.detailedContent.overview}
                  </p>
                </motion.div>
              )}

              {/* Objectives */}
              {event.detailedContent?.objectives && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Objectives</h2>
                  <div className="grid gap-4">
                    {event.detailedContent.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Rounds/Agenda/Program/Timeline */}
              {(event.detailedContent?.rounds || event.detailedContent?.agenda || event.detailedContent?.program || event.detailedContent?.timeline) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {event.detailedContent?.rounds ? 'Competition Rounds' : 
                     event.detailedContent?.agenda ? 'Agenda' :
                     event.detailedContent?.program ? 'Program Schedule' : 'Timeline'}
                  </h2>
                  <div className="space-y-6">
                    {(event.detailedContent?.rounds || event.detailedContent?.agenda || event.detailedContent?.program || event.detailedContent?.timeline)?.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                        {typeof item === 'object' ? (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {item.round || `Session ${index + 1}`}
                            </h3>
                            <p className="text-gray-700 mb-3">{item.description}</p>
                            {item.duration && (
                              <p className="text-sm text-blue-600 font-semibold">Duration: {item.duration}</p>
                            )}
                            {item.topics && (
                              <div className="mt-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Topics:</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.topics.map((topic, topicIndex) => (
                                    <span key={topicIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-700">{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Prizes */}
              {event.detailedContent?.prizes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Prizes & Awards</h2>
                  <div className="grid gap-4">
                    {event.detailedContent.prizes.map((prize, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <FaTrophy className="text-yellow-600 mr-3 text-xl" />
                        <span className="text-gray-800 font-medium">{prize}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Registration */}
              {event.detailedContent?.registration && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Registration Details</h2>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Process</h3>
                        <p className="text-gray-700">{event.detailedContent.registration.process}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Deadline</h3>
                        <p className="text-gray-700">{event.detailedContent.registration.deadline}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Fee</h3>
                        <p className="text-gray-700">{event.detailedContent.registration.fee}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                        <ul className="text-gray-700">
                          {event.detailedContent.registration.requirements?.map((req, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-2 text-sm" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8"
              >
                <h2 className="text-3xl font-bold mb-4">Event Information</h2>
                <p className="text-blue-100 mb-6">Stay tuned for more details about this amazing opportunity to learn, network, and grow!</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
// Sample quiz questions for IEEE Quiz
export const quizQuestions = [
  {
    id: 1,
    question: "What does IEEE stand for?",
    options: [
      "Institute of Electrical and Electronics Engineers",
      "International Electrical and Electronics Engineers",
      "Institute of Electronic and Electrical Engineers",
      "International Electronic and Electrical Engineers"
    ],
    correctAnswer: 0,
    category: "General IEEE Knowledge",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "In which year was IEEE founded?",
    options: ["1963", "1884", "1945", "1957"],
    correctAnswer: 0,
    category: "IEEE History",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "What is the primary purpose of IEEE?",
    options: [
      "To advance technology for humanity",
      "To conduct electrical research only",
      "To manufacture electronic devices",
      "To provide internet services"
    ],
    correctAnswer: 0,
    category: "General IEEE Knowledge",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "Which of the following is NOT an IEEE standard?",
    options: ["802.11", "802.3", "TCP/IP", "754"],
    correctAnswer: 2,
    category: "IEEE Standards",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What does the IEEE 802.11 standard define?",
    options: [
      "Ethernet networking",
      "Wireless networking (Wi-Fi)",
      "Bluetooth communication",
      "USB protocols"
    ],
    correctAnswer: 1,
    category: "IEEE Standards",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "IEEE's headquarters is located in which city?",
    options: ["New York", "Washington D.C.", "Boston", "San Francisco"],
    correctAnswer: 0,
    category: "IEEE Organization",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "What is the IEEE motto?",
    options: [
      "Advancing Technology for Humanity",
      "Innovation through Engineering",
      "Technology for Better Tomorrow",
      "Engineering Excellence"
    ],
    correctAnswer: 0,
    category: "General IEEE Knowledge",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "IEEE Computer Society is focused on which area?",
    options: [
      "Electrical engineering only",
      "Computer science and engineering",
      "Mechanical engineering",
      "Civil engineering"
    ],
    correctAnswer: 1,
    category: "IEEE Societies",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "What does IEEE 754 standard define?",
    options: [
      "Network protocols",
      "Floating-point arithmetic",
      "Image compression",
      "Audio encoding"
    ],
    correctAnswer: 1,
    category: "IEEE Standards",
    difficulty: "Hard"
  },
  {
    id: 10,
    question: "IEEE publishes how many journals and magazines?",
    options: ["Over 50", "Over 100", "Over 200", "Over 300"],
    correctAnswer: 2,
    category: "IEEE Publications",
    difficulty: "Hard"
  },
  {
    id: 11,
    question: "What is the IEEE membership grade for students?",
    options: ["Associate", "Student Member", "Graduate Student", "Member"],
    correctAnswer: 1,
    category: "IEEE Membership",
    difficulty: "Easy"
  },
  {
    id: 12,
    question: "IEEE Xplore is:",
    options: [
      "A digital library",
      "A research tool",
      "An educational platform",
      "All of the above"
    ],
    correctAnswer: 3,
    category: "IEEE Resources",
    difficulty: "Medium"
  },
  {
    id: 13,
    question: "What does the term 'Big Data' typically refer to in IEEE context?",
    options: [
      "Large storage devices",
      "Datasets too large for traditional processing",
      "High-speed internet",
      "Cloud computing"
    ],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "IEEE conferences are held:",
    options: [
      "Only in the United States",
      "Only in developed countries",
      "Worldwide",
      "Only online"
    ],
    correctAnswer: 2,
    category: "IEEE Events",
    difficulty: "Easy"
  },
  {
    id: 15,
    question: "What is the highest grade of IEEE membership?",
    options: ["Senior Member", "Fellow", "Life Fellow", "Honorary Member"],
    correctAnswer: 1,
    category: "IEEE Membership",
    difficulty: "Medium"
  },
  {
    id: 16,
    question: "IEEE Code of Ethics emphasizes:",
    options: [
      "Profit maximization",
      "Professional responsibility and public welfare",
      "Technical excellence only",
      "Personal advancement"
    ],
    correctAnswer: 1,
    category: "IEEE Ethics",
    difficulty: "Easy"
  },
  {
    id: 17,
    question: "What does IoT stand for in technology?",
    options: [
      "Internet of Technology",
      "Internet of Things",
      "Institute of Technology",
      "International of Technology"
    ],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "Easy"
  },
  {
    id: 18,
    question: "IEEE Power & Energy Society focuses on:",
    options: [
      "Computer networks",
      "Electrical power systems",
      "Software development",
      "Telecommunications"
    ],
    correctAnswer: 1,
    category: "IEEE Societies",
    difficulty: "Easy"
  },
  {
    id: 19,
    question: "What is machine learning primarily used for?",
    options: [
      "Hardware manufacturing",
      "Pattern recognition and prediction",
      "Network routing",
      "Database management"
    ],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "Medium"
  },
  {
    id: 20,
    question: "IEEE Student Branches are:",
    options: [
      "Research laboratories",
      "Local IEEE chapters at universities",
      "Online communities",
      "Professional societies"
    ],
    correctAnswer: 1,
    category: "IEEE Organization",
    difficulty: "Easy"
  }
];

// Function to get random questions for quiz
export function getRandomQuestions(count = 20) {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to calculate score
export function calculateScore(answers, questions) {
  let correct = 0;
  let total = questions.length;
  
  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correct++;
    }
  });
  
  return {
    correct,
    total,
    percentage: Math.round((correct / total) * 100),
    grade: getGrade((correct / total) * 100)
  };
}

// Function to get grade based on percentage
export function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}

// Function to validate quiz password
export function validateQuizPassword(password) {
  return password === 'ieee@321'; // Default quiz password
}

export default quizQuestions;
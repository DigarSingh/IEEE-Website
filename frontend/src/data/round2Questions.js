// Kindle Jr 4.0 Round 2 Questions - MCQ + One Word + Code Snippet
export const round2Questions = [
  // MCQ Questions
  {
    id: 1,
    type: "mcq",
    question: "Which programming language is primarily used for web development frontend?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "Easy",
    points: 2
  },
  {
    id: 2,
    type: "mcq", 
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "High Tech Modern Language", 
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "Easy", 
    points: 2
  },
  {
    id: 3,
    type: "mcq",
    question: "Which data structure follows LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    category: "Data Structures",
    difficulty: "Medium",
    points: 3
  },
  {
    id: 4,
    type: "mcq",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    category: "Algorithms",
    difficulty: "Medium",
    points: 3
  },
  {
    id: 5,
    type: "mcq",
    question: "Which CSS property is used to change the text color?",
    options: ["background-color", "font-color", "color", "text-color"],
    correctAnswer: 2,
    category: "CSS",
    difficulty: "Easy",
    points: 2
  },

  // One Word Questions
  {
    id: 6,
    type: "oneword",
    question: "What keyword is used to create a function in Python?",
    correctAnswer: "def",
    category: "Python",
    difficulty: "Easy",
    points: 3,
    hint: "It's a 3-letter keyword"
  },
  {
    id: 7,
    type: "oneword", 
    question: "What is the file extension for JavaScript files?",
    correctAnswer: "js",
    category: "JavaScript",
    difficulty: "Easy",
    points: 3,
    hint: "Two letters"
  },
  {
    id: 8,
    type: "oneword",
    question: "Which HTML tag is used to create a hyperlink?",
    correctAnswer: "a",
    category: "HTML",
    difficulty: "Easy",
    points: 3,
    hint: "Single letter tag"
  },
  {
    id: 9,
    type: "oneword",
    question: "What operator is used for assignment in most programming languages?",
    correctAnswer: "=",
    category: "Programming Basics",
    difficulty: "Easy",
    points: 3,
    hint: "Mathematical symbol"
  },
  {
    id: 10,
    type: "oneword",
    question: "What keyword is used to import modules in Python?",
    correctAnswer: "import",
    category: "Python",
    difficulty: "Easy", 
    points: 3,
    hint: "6-letter keyword"
  },

  // Code Snippet Questions
  {
    id: 11,
    type: "code",
    question: "What will be the output of this Python code?",
    code: `
x = 5
y = 2
print(x // y)
    `,
    correctAnswer: "2",
    category: "Python",
    difficulty: "Medium",
    points: 5,
    hint: "Floor division operator"
  },
  {
    id: 12,
    type: "code",
    question: "What will be the output of this JavaScript code?",
    code: `
let arr = [1, 2, 3];
console.log(arr.length);
    `,
    correctAnswer: "3",
    category: "JavaScript",
    difficulty: "Easy",
    points: 4,
    hint: "Array property"
  },
  {
    id: 13,
    type: "code",
    question: "What will be the output of this Python code?",
    code: `
def multiply(a, b=5):
    return a * b

print(multiply(3))
    `,
    correctAnswer: "15",
    category: "Python",
    difficulty: "Medium",
    points: 5,
    hint: "Default parameter value"
  },
  {
    id: 14,
    type: "code",
    question: "What will be the output of this JavaScript code?",
    code: `
let str = "Hello";
console.log(str.toUpperCase());
    `,
    correctAnswer: "HELLO",
    category: "JavaScript", 
    difficulty: "Easy",
    points: 4,
    hint: "String method"
  },
  {
    id: 15,
    type: "code",
    question: "What will be the output of this Python code?",
    code: `
numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])
    `,
    correctAnswer: "[2, 3, 4]",
    category: "Python",
    difficulty: "Medium", 
    points: 5,
    hint: "List slicing"
  },
  {
    id: 16,
    type: "code",
    question: "What will be the output of this C++ code?",
    code: `
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = ++x;
    cout << y;
    return 0;
}
    `,
    correctAnswer: "11",
    category: "C++",
    difficulty: "Medium",
    points: 5,
    hint: "Pre-increment operator"
  },
  {
    id: 17,
    type: "code",
    question: "What will be the output of this JavaScript code?",
    code: `
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(4));
    `,
    correctAnswer: "24",
    category: "JavaScript",
    difficulty: "Hard",
    points: 6,
    hint: "Recursive function"
  },
  {
    id: 18,
    type: "code",
    question: "What will be the output of this Python code?",
    code: `
dict1 = {'a': 1, 'b': 2, 'c': 3}
print(len(dict1))
    `,
    correctAnswer: "3",
    category: "Python",
    difficulty: "Easy",
    points: 4,
    hint: "Dictionary length"
  },
  {
    id: 19,
    type: "code",
    question: "What will be the output of this Java code?",
    code: `
public class Test {
    public static void main(String[] args) {
        String str = "Java";
        System.out.println(str.substring(1, 3));
    }
}
    `,
    correctAnswer: "av",
    category: "Java",
    difficulty: "Medium", 
    points: 5,
    hint: "String substring method"
  },
  {
    id: 20,
    type: "code",
    question: "What will be the output of this Python code?",
    code: `
x = [1, 2, 3]
y = x
y.append(4)
print(len(x))
    `,
    correctAnswer: "4",
    category: "Python",
    difficulty: "Hard",
    points: 6,
    hint: "List reference behavior"
  }
];

// Question distribution
export const round2Config = {
  totalQuestions: 20,
  mcqQuestions: 5,      // 5 MCQ questions (2-3 points each)
  oneWordQuestions: 5,  // 5 One Word questions (3 points each)
  codeQuestions: 10,    // 10 Code Snippet questions (4-6 points each)
  totalPoints: 85,      // Maximum possible points
  timeLimit: 45,        // 45 minutes
  passingScore: 50      // 50 points to pass
};
# IEEE Quiz - Answer Key & Test Guide 📝

## IMPORTANT: Understanding Answer Indices

In the quiz system:

- **Option A = Index 0**
- **Option B = Index 1**
- **Option C = Index 2**
- **Option D = Index 3**

The `correctAnswer` field stores the **INDEX** (0, 1, 2, or 3), NOT the letter!

---

## Complete Answer Key (All 20 Questions)

### Question 1

**Q:** What does IEEE stand for?
**Options:**

- A) Institute of Electrical and Electronics Engineers ← **CORRECT (Index 0)**
- B) International Electrical and Electronics Engineers
- C) Institute of Electronic and Electrical Engineers
- D) International Electronic and Electrical Engineers

**Correct Answer:** **A** (Index 0)

---

### Question 2

**Q:** In which year was IEEE founded?
**Options:**

- A) 1963 ← **CORRECT (Index 0)**
- B) 1884
- C) 1945
- D) 1957

**Correct Answer:** **A** (Index 0)

---

### Question 3

**Q:** What is the primary purpose of IEEE?
**Options:**

- A) To advance technology for humanity ← **CORRECT (Index 0)**
- B) To conduct electrical research only
- C) To manufacture electronic devices
- D) To provide internet services

**Correct Answer:** **A** (Index 0)

---

### Question 4

**Q:** Which of the following is NOT an IEEE standard?
**Options:**

- A) 802.11
- B) 802.3
- C) TCP/IP ← **CORRECT (Index 2)**
- D) 754

**Correct Answer:** **C** (Index 2)

---

### Question 5

**Q:** What does the IEEE 802.11 standard define?
**Options:**

- A) Ethernet networking
- B) Wireless networking (Wi-Fi) ← **CORRECT (Index 1)**
- C) Bluetooth communication
- D) USB protocols

**Correct Answer:** **B** (Index 1)

---

### Question 6

**Q:** IEEE's headquarters is located in which city?
**Options:**

- A) New York ← **CORRECT (Index 0)**
- B) Washington D.C.
- C) Boston
- D) San Francisco

**Correct Answer:** **A** (Index 0)

---

### Question 7

**Q:** What is the IEEE motto?
**Options:**

- A) Advancing Technology for Humanity ← **CORRECT (Index 0)**
- B) Innovation through Engineering
- C) Technology for Better Tomorrow
- D) Engineering Excellence

**Correct Answer:** **A** (Index 0)

---

### Question 8

**Q:** IEEE Computer Society is focused on which area?
**Options:**

- A) Electrical engineering only
- B) Computer science and engineering ← **CORRECT (Index 1)**
- C) Mechanical engineering
- D) Civil engineering

**Correct Answer:** **B** (Index 1)

---

### Question 9

**Q:** What does IEEE 754 standard define?
**Options:**

- A) Network protocols
- B) Floating-point arithmetic ← **CORRECT (Index 1)**
- C) Image compression
- D) Audio encoding

**Correct Answer:** **B** (Index 1)

---

### Question 10

**Q:** IEEE publishes how many journals and magazines?
**Options:**

- A) Over 50
- B) Over 100
- C) Over 200 ← **CORRECT (Index 2)**
- D) Over 300

**Correct Answer:** **C** (Index 2)

---

### Question 11

**Q:** What is the IEEE membership grade for students?
**Options:**

- A) Associate
- B) Student Member ← **CORRECT (Index 1)**
- C) Graduate Student
- D) Member

**Correct Answer:** **B** (Index 1)

---

### Question 12

**Q:** IEEE Xplore is:
**Options:**

- A) A digital library
- B) A research tool
- C) An educational platform
- D) All of the above ← **CORRECT (Index 3)**

**Correct Answer:** **D** (Index 3)

---

### Question 13

**Q:** What does the term 'Big Data' typically refer to in IEEE context?
**Options:**

- A) Large storage devices
- B) Datasets too large for traditional processing ← **CORRECT (Index 1)**
- C) High-speed internet
- D) Cloud computing

**Correct Answer:** **B** (Index 1)

---

### Question 14

**Q:** IEEE conferences are held:
**Options:**

- A) Only in the United States
- B) Only in developed countries
- C) Worldwide ← **CORRECT (Index 2)**
- D) Only online

**Correct Answer:** **C** (Index 2)

---

### Question 15

**Q:** What is the highest grade of IEEE membership?
**Options:**

- A) Senior Member
- B) Fellow ← **CORRECT (Index 1)**
- C) Life Fellow
- D) Honorary Member

**Correct Answer:** **B** (Index 1)

---

### Question 16

**Q:** IEEE Code of Ethics emphasizes:
**Options:**

- A) Profit maximization
- B) Professional responsibility and public welfare ← **CORRECT (Index 1)**
- C) Technical excellence only
- D) Personal advancement

**Correct Answer:** **B** (Index 1)

---

### Question 17

**Q:** What does IoT stand for in technology?
**Options:**

- A) Internet of Technology
- B) Internet of Things ← **CORRECT (Index 1)**
- C) Institute of Technology
- D) International of Technology

**Correct Answer:** **B** (Index 1)

---

### Question 18

**Q:** IEEE Power & Energy Society focuses on:
**Options:**

- A) Computer networks
- B) Electrical power systems ← **CORRECT (Index 1)**
- C) Software development
- D) Telecommunications

**Correct Answer:** **B** (Index 1)

---

### Question 19

**Q:** What is machine learning primarily used for?
**Options:**

- A) Hardware manufacturing
- B) Pattern recognition and prediction ← **CORRECT (Index 1)**
- C) Network routing
- D) Database management

**Correct Answer:** **B** (Index 1)

---

### Question 20

**Q:** IEEE Student Branches are:
**Options:**

- A) Research laboratories
- B) Local IEEE chapters at universities ← **CORRECT (Index 1)**
- C) Online communities
- D) Professional societies

**Correct Answer:** **B** (Index 1)

---

## Quick Test Pattern

**For testing, answer the first 5 questions like this:**

1. Question 1: Click **Option A** (should record as index 0)
2. Question 2: Click **Option A** (should record as index 0)
3. Question 3: Click **Option A** (should record as index 0)
4. Question 4: Click **Option C** (should record as index 2)
5. Question 5: Click **Option B** (should record as index 1)

**Expected Result:** 5/5 correct = 100%

---

## What to Check in Console Logs

### When You Click Option A for Question 1:

```javascript
📝 Answer selected: {
  questionId: 1,
  answerIndex: 0,  ← Should be 0 (not "0")
  answerType: "number",  ← Must be "number"
  question: "What does IEEE stand for?"
}
```

### When You Submit:

```javascript
=== Question 1 (ID: 1) ===
Question text: "What does IEEE stand for?"
User answer: 0 (type: number)  ← Your answer
Correct answer: 0 (type: number)  ← Correct answer
User selected: "Institute of Electrical and Electronics Engineers"
Correct option: "Institute of Electrical and Electronics Engineers"
Comparison (===): true  ← Should be true!
✅ CORRECT!
```

---

## Summary Table

| Q#  | Correct Answer                     | Index |
| --- | ---------------------------------- | ----- |
| 1   | A (Institute of Electrical...)     | 0     |
| 2   | A (1963)                           | 0     |
| 3   | A (To advance technology...)       | 0     |
| 4   | C (TCP/IP)                         | 2     |
| 5   | B (Wireless networking)            | 1     |
| 6   | A (New York)                       | 0     |
| 7   | A (Advancing Technology...)        | 0     |
| 8   | B (Computer science...)            | 1     |
| 9   | B (Floating-point...)              | 1     |
| 10  | C (Over 200)                       | 2     |
| 11  | B (Student Member)                 | 1     |
| 12  | D (All of the above)               | 3     |
| 13  | B (Datasets too large...)          | 1     |
| 14  | C (Worldwide)                      | 2     |
| 15  | B (Fellow)                         | 1     |
| 16  | B (Professional responsibility...) | 1     |
| 17  | B (Internet of Things)             | 1     |
| 18  | B (Electrical power systems)       | 1     |
| 19  | B (Pattern recognition...)         | 1     |
| 20  | B (Local IEEE chapters...)         | 1     |

---

## Quick Pattern Recognition

Notice that:

- **Questions 1-3, 6-7:** Answer is **A (Index 0)**
- **Question 4:** Answer is **C (Index 2)**
- **Most other questions:** Answer is **B (Index 1)**

This makes it easy to test!

---

## Test Scenario

### Simple 5-Question Test:

Answer the first 5 questions correctly:

1. **Q1:** A
2. **Q2:** A
3. **Q3:** A
4. **Q4:** C
5. **Q5:** B

**Expected Score:** 5/5 = 100%

If you get anything other than 100%, check the console logs to see:

- What index was recorded for each answer
- What index is the correct answer
- Whether they match

This will help us identify the exact problem!

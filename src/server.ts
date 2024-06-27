import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

interface Answer {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

let questions: Question[] = [
  {
    id: 1,
    question: "How do you feel about social gatherings?",
    answers: [
      { text: "I love them and often stay till the end.", score: 2 },
      {
        text: "I enjoy them but prefer to leave at a reasonable time.",
        score: 1,
      },
      {
        text: "I'm indifferent, I can go but prefer smaller groups.",
        score: -1,
      },
      { text: "I avoid them whenever possible.", score: -2 },
    ],
  },
  {
    id: 2,
    question: "When working on a project, you prefer to:",
    answers: [
      { text: "Collaborate with others for ideas and energy.", score: 2 },
      {
        text: "Have some discussions, but mostly work independently.",
        score: 1,
      },
      { text: "Work alone; it’s more efficient for me.", score: -2 },
      { text: "It depends on the project's nature.", score: 0 },
    ],
  },
  {
    id: 3,
    question: "How do you recharge after a busy week?",
    answers: [
      { text: "Going out with friends or a party.", score: 2 },
      { text: "A dinner with close friends.", score: 1 },
      { text: "Quiet time at home with a book or movie.", score: -2 },
      { text: "Doing a hobby or activity alone.", score: -1 },
    ],
  },
  {
    id: 4,
    question: "What's your preferred way to spend a vacation?",
    answers: [
      { text: "Exploring new cities and meeting new people.", score: 2 },
      { text: "Attending a festival or public event.", score: 1 },
      {
        text: "Relaxing at a quiet place, like a beach or mountain.",
        score: -2,
      },
      { text: "Staying home and enjoying personal time.", score: -1 },
    ],
  },
];

app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/answers", (req, res) => {
  const answers = req.body;
  const totalScore = answers.reduce(
    (acc: number, answer: Answer) => acc + answer.score,
    0
  );
  const personalityType = totalScore > 0 ? "Extrovert" : "Introvert";
  res.json({ personalityType });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

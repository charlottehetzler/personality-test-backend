// src/server.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import questions from "./data/questions";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/answers", (req, res) => {
  const answers = req.body;
  const totalScore = answers.reduce(
    (acc: number, answer: { score: number }) => acc + answer.score,
    0
  );
  const personalityType = totalScore > 0 ? "Extrovert" : "Introvert";
  res.json({ personalityType });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

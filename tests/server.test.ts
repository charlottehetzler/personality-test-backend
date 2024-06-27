// tests/server.test.ts
import request from "supertest";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import questions from "../src/data/questions";

const app = express();
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

describe("GET /questions", () => {
  it("should return all questions", async () => {
    const response = await request(app).get("/questions");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(questions.length);
  });
});

describe("POST /answers", () => {
  it("should return personality type", async () => {
    const response = await request(app)
      .post("/answers")
      .send([{ score: 2 }, { score: 1 }, { score: -1 }, { score: 0 }]);
    expect(response.status).toBe(200);
    expect(response.body.personalityType).toBe("Extrovert");
  });
});

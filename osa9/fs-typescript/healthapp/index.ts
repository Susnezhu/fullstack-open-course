import express from 'express';
import { calculateBmi  } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  type Results = {
    weight: number,
    height: number,
    bmi: string
  };

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).send({error: "malformatted parameters"});
  };

  const result : Results = {
    weight: 0,
    height: 0,
    bmi: ''
  };

  try {
    result.weight = weight;
    result.height = height;
    result.bmi = calculateBmi(height, weight);

  } catch (error) {
    return res.status(400).send({
      error: (error as Error).message
    });
  }

  return res.send(result);
});

app.post('/exercises', (req, res) => {

  type Result = {
    periodLength: number
    trainingDays: number
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  };

  type ExerciseRequest = {
    daily_exercises: number[];
    target: number;
  };
  const body = req.body as ExerciseRequest;

  const exercises = body.daily_exercises;
  const target = body.target;

  if (exercises == null || target == null) {
    return res.status(400).send({error: "parameters missing"});
  }

  let result : Result;

  try {
    result = calculateExercises(exercises, target);
  } catch (error) {
    return res.status(400).send({
      error: (error as Error).message
    });
  }

  return res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
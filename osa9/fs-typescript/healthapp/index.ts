import express from 'express';
import { calculateBmi  } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).send({error: "malformatted parameters"})
  };

  let result = {}

  try {
    result = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    };
  } catch (error) {
    return res.status(400).send({
      error: (error as Error).message
    });
  }

  return res.send(result);
});

app.post('/exercises', (req, res) => {
  const exercises = req.body.daily_exercises
  const target = req.body.target

  if (exercises == null || target == null) {
    return res.status(400).send({error: "parameters missing"});
  }

  let result = {}

  try {
    result = calculateExercises(exercises, target);
  } catch (error) {
    return res.status(400).send({
      error: (error as Error).message
    })
  }

  return res.send(result)
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
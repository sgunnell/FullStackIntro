import express from 'express';
const app = express();
import calculateBMI from './bmiCalculator';
import { exerciseCalculator, validateArguments } from './exerciseCalculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const validParameters: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));
    const bmi = calculateBMI(Number(height), Number(weight));

    if (!validParameters || !weight || !height) {
        res.status(400).send({ error: "malformatted parameters" });
      }
    
      res.send({ height, weight, bmi });
});

app.post("/exercises", (req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, dailyExercises } = req.body;

    if (!(dailyExercises && target)) {
        res.status(400).send({ error: "parameters missing" });
    }

    try{
        const { validTarget, validDailyHours } = validateArguments( target, dailyExercises );
        res.send(exerciseCalculator(validTarget, validDailyHours));
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
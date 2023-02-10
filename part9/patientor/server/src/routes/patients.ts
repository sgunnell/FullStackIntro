import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.get('/:patientId', (req, res) => {
  res.send(patientService.getOne(req.params.patientId));
});

router.post('/', (req, res) => {
  try{

    console.log("posting step 1");
    const newPatient = toNewPatient(req.body);
    console.log("posting step 2");
    const addedEntry = patientService.addPatient(newPatient);
    console.log("posting step 3");
    res.json(addedEntry)
    console.log("posting step 4");

  } catch( error: unknown ) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;
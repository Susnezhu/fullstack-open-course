import express from 'express';
import patientsService from '../services/patients.ts';
import { parseNewPatient, parseNewEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getNonSensitivePatientEntry();
  res.send(data);
});

router.get('/:id', (_req, res) => {
  const data = patientsService.getPatientById(_req.params.id);
  res.send(data);
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
      const newEntry = parseNewEntry(req.body);

      const addedEntry = patientsService.addEntry(newEntry, patient.id);
      res.json(addedEntry);
    }

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
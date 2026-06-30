import type { NewPatient, NewEntry, Diagnoses, HealthCheckRating, NewBaseEntry, OccupationalHealthcareEntry } from './types.ts';
import { Gender } from './types.ts';

import { z } from 'zod';


//functions for checking values

const isString = (text: unknown): text is string => {
  // console.log(z.string().parse(text), 'is a string:', Boolean(z.string().parse(text)));
  return Boolean(z.string().parse(text));
};

const isSSN = (ssn: string): boolean => {

  // console.log(ssn.substring(0, 6), ssn.substring(7, 11), ssn[6]);

  if (
    ssn.substring(0, 6).length != 6 ||
    ssn.substring(7, 11).length > 4 ||
    ssn[6] != '-'
  ) {
    return false;
  }

  return true;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};




// functions for parsing data for new patient:

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing value2');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing value4');
  }

  return gender;
};

// parse new patients
const parseNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatient = {
      name: z.string().parse(object.name),
      ssn: parseSSN(object.ssn),
      dateOfBirth: z.iso.date().parse(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: z.string().parse(object.occupation),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};



// functions for parsing data for new Entry:
const parseDiagnosisCodes = (diagnosis: unknown): Array<Diagnoses['code']> => {

  if (!Array.isArray(diagnosis) || !diagnosis.every(item => typeof item === 'string')) {
    throw new Error(JSON.stringify([{ message: 'Incorrect diagnosis codes'}]));
  }

  return diagnosis;
};

const parseDischarge = (discharge: unknown) => {

  if (discharge && typeof discharge === 'object' && 'date' in discharge && 'criteria' in discharge && isString(discharge.criteria)) {
    return {
      date: z.iso.date().parse(discharge.date),
      criteria: discharge.criteria
    };
  }

  throw new Error(JSON.stringify([{ message: 'Incorrect discharge'}]));
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
  } as const;

  return z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]).parse(rating);
};

const parseSickLeave = (sickLeave: unknown) => {
  if (sickLeave && typeof sickLeave === 'object' && 'startDate' in sickLeave && 'endDate' in sickLeave) {
    return {
      startDate: z.iso.date().parse(sickLeave.startDate),
      endDate: z.iso.date().parse(sickLeave.endDate)
    };
  };

  throw new Error(JSON.stringify([{ message: 'sickLeave error'}]));
 
};

// parse new Entry
const parseNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error(JSON.stringify([{ message: 'Incorrect or missing data'}]));
  }

  if ('description' in object && 'date' in object && 'specialist' in object)  {
    const baseEntry: NewBaseEntry = {
      description: z.string().parse(object.description),
      date: z.iso.date().parse(object.date),
      specialist: z.string().parse(object.specialist)
    };

    if ('diagnosisCodes' in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    };

    if ('type' in object) {
      switch (object.type) {
        case 'Hospital':
          if (!('discharge' in object)) {
            throw new Error(JSON.stringify([{ message: 'Discharge missing'}]));
          }
          
          return {
            ...baseEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)
          };

        case 'HealthCheck':
          if (!('healthCheckRating' in object)) {
            throw new Error(JSON.stringify([{ message:'healthCheckRating missing'}]));
          };

          return {
            ...baseEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
        case 'OccupationalHealthcare': {
          if (!('employerName' in object)) {
            throw new Error(JSON.stringify([{ message: 'employerName missing' }]));
          };

          const entry = {
            ...baseEntry,
            type: 'OccupationalHealthcare',
            employerName: z.string().parse(object.employerName),
          };

          if ('sickLeave' in object) {
            return {
              ...entry,
              sickLeave: parseSickLeave(object.sickLeave)
            } as OccupationalHealthcareEntry;
          }

          return entry as OccupationalHealthcareEntry;
        }
        default:
          throw new Error(JSON.stringify([{ message: 'type is missing'}]));
      }
    };
  };

  throw new Error(JSON.stringify([{ message: 'some parameters are missing'}]));
};

export {
  parseNewPatient,
  parseNewEntry
};
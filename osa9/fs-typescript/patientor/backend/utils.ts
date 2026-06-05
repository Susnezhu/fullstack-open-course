import type { NewPatient} from './types.ts';
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




// functions for parsing data:

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
      occupation: z.string().parse(object.occupation)
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;
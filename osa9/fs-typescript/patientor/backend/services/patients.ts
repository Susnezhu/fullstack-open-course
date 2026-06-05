import pationsData from '../data/patients.ts';
import type { NonSensitivePatientEntry, Patiens, NewPatient } from '../types.ts';
import { v4 as uuid } from 'uuid';

const getPatients = () : Patiens[] => {
  return pationsData;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {  
  return pationsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patiens => {
  const newId : string = uuid();

  const newPatient = {
    id: newId,
    ...entry  
  };

  pationsData.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addPatient
};
import pationsData from '../data/patients.ts';
import type { NonSensitivePatient, Patiens, NewPatient, NewEntry, Entry } from '../types.ts';
import { v4 as uuid } from 'uuid';

const getPatients = () : Patiens[] => {
  return pationsData;
};

const getNonSensitivePatientEntry = (): NonSensitivePatient[] => {  
  return pationsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string) : Patiens | undefined => {
  return pationsData.find((patient) => patient.id === id);
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

const addEntry = ( entry: NewEntry, patientId: string ): Entry => {
  const patient = pationsData.find(p => p.id === patientId);

    if (!patient) {
      throw new Error('Patient not found');
    }

    const newEntry: Entry = {
      id: uuid(),
      ...entry
    };

    patient.entries.push(newEntry);

    return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  addPatient,
  getPatientById,
  addEntry
};
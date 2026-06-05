import diagnosesData from '../data/diagnoses.ts';
import type { Diagnoses } from '../types.ts';

const getDiagnoses = () : Diagnoses[] => {
  return diagnosesData;
};


export default {
  getDiagnoses
};
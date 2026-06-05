// diagnoses
export interface Diagnoses {
  code: string,
  name: string,
  latin?: string
}


// patiens
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export interface Patiens {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type Gender = typeof Gender[keyof typeof Gender];

export type NonSensitivePatientEntry = Omit<Patiens, 'ssn'>;

export type NewPatient = Omit<Patiens, 'id'>;
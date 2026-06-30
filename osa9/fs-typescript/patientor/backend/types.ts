// diagnoses
export interface Diagnoses {
  code: string,
  name: string,
  latin?: string
}

// Entry
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

type Discharge = {
  date: string,
  criteria: string,
};

export interface HospitalEntry extends BaseEntry{
  type: 'Hospital',
  discharge: Discharge,
}

type sickLeave = {
  startDate: string,
  endDate: string
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: sickLeave,
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;


// patiens
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;


export interface Patiens {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}



export type Gender = typeof Gender[keyof typeof Gender];

export type NonSensitivePatient = Omit<Patiens, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patiens, 'id'>;

export type NewEntry = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'> | Omit<HealthCheckEntry, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, 'id' | 'type'>;
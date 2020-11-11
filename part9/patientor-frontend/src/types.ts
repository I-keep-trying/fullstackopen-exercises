export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: boolean;
  startDate: string;
  endDate: string;
}

export type SickLeave =
  | OccupationalHealthcareEntry['startDate']
  | OccupationalHealthcareEntry['endDate'];

export type EntriesTypes =
  | HospitalEntry['type']
  | OccupationalHealthcareEntry['type']
  | HealthCheckEntry['type'];

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

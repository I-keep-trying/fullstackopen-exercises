export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type SecurePatientRecord = Omit<PatientRecord, 'ssn'>;

export type NewPatientRecord = Omit<PatientRecord, 'id'>;

import { SecurePatient, Patient, NewPatient } from '../types';
import patients from '../../data/patients';
import { nanoid } from 'nanoid';

export const getPatients = (): Patient[] => patients;

export const getSecurePatient = (): SecurePatient[] =>
  getPatients().map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    ...entry,
    id: nanoid(),
  };
  patients.push(newPatient);
  return newPatient;
};

export const findById = (id: string): Patient | undefined => {
  return getPatients().find((patient) => patient.id === id);
};
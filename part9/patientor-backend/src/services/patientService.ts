import patients from '../../data/typedPatients';

import { SecurePatient, Patient, NewPatient } from '../types';

export const getPatients = (): Array<Patient> => patients;

export const getSecurePatient = (): SecurePatient[] => {
  return getPatients().map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: Date.now().toString(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export const findById = (id: string): Patient | undefined => {
  return getPatients().find((patient) => patient.id === id);
};

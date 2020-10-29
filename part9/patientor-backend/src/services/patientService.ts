import patientRecords from '../../data/typedPatients';

import { SecurePatientRecord, PatientRecord, NewPatientRecord } from '../types';

const getEntries = (): Array<PatientRecord> => {
  return patientRecords;
};

const getSecurePatientRecord = (): SecurePatientRecord[] => {
  return patientRecords.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const findById = (id: string): PatientRecord | undefined => {
  const record = patientRecords.find((p) => p.id === id);
  return record;
};

const addEntry = (entry: NewPatientRecord): PatientRecord => {
  const newPatientRecord = {
    id: Date.now().toString(),
    ...entry,
  };

  patientRecords.push(newPatientRecord);
  return newPatientRecord;
};

export default {
  getEntries,
  addEntry,
  getSecurePatientRecord,
  findById,
};

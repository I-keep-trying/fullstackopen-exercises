import { Diagnosis } from '../types';
import diagnosisRecords from '../../data/typedDiagnoses';

export const getDiagnoses = (): Diagnosis[] => diagnosisRecords;

export const addDiagnosis = (): Diagnosis[] => {
  return [];
};

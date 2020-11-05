import { Diagnosis } from '../types';
import diagnosisRecords from '../../data/typedDiagnoses';

export const getDiagnoses = (): Diagnosis[] => diagnosisRecords;



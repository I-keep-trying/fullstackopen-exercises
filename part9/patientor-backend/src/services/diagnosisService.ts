import diagnosisRecords from '../../data/typedDiagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosisRecords;
};

export default { getDiagnoses };

import React from 'react';
import { Patient } from '../types';

const PatientLink: React.FC<{ patient: Patient }> = ({ patient }) => {
  console.log('patient from PatientLink', patient);
  return <div> </div>;
};

export default PatientLink;

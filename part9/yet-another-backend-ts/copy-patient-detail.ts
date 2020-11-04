import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
// import { Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { updatePatient } from '../state/reducer';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    if (state.patients[id] && state.patients[id].entries) {
      return;
    }

    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPatient();
  }, [dispatch, id, state.patients]);

  return state.patients[id] ? (
    <div>
      <h2>{state.patients[id].name}</h2>
      <p>gender: {state.patients[id].gender}</p>
      <p>occupation: {state.patients[id].occupation}</p>
      {
        // optional field
        state.patients[id].ssn && <p>ssn: {state.patients[id].ssn}</p>
      }
      {
        // optional field
        state.patients[id].dateOfBirth && (
          <p>date of birth: {state.patients[id].dateOfBirth}</p>
        )
      }
      <h3>Entries</h3>
      {state.patients[id].entries
        ? (() => {
            // const entries = state.patients[id].entries as Entry[];
            return null; // entries is just an empty list at the time, but we'll need it later
          })()
        : (() => {
            return <p>loading entries</p>;
          })()}
    </div>
  ) : null;
};

export default PatientPage;

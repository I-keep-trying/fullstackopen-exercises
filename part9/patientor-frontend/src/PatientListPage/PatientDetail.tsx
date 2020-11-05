import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Icon } from 'semantic-ui-react';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
//import { Entry, Diagnosis } from '../types';
import Entries from './Entries';
//import { nanoid } from 'nanoid';

const PatientDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [
    {
      patients,
      // diagnoses
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patients[id] && patients[id].entries) {
        return;
      }
      try {
        const { data: patientFromApi } = await axios.get(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.log(e);
      }
    };
    fetchPatient();
  }, [dispatch, id, patients]);

  return patients[id] ? (
    <div className="App">
      <Container textAlign="center">
        <h1>
          {patients[id].name}
          {patients[id].gender === 'male' ? (
            <Icon className="mars big icon" />
          ) : patients[id].gender === 'female' ? (
            <Icon className="venus big icon" />
          ) : (
            <Icon className="genderless big icon" />
          )}
        </h1>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Gender: </Table.HeaderCell>
            <Table.Cell>{patients[id].gender}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>SSN</Table.HeaderCell>
            <Table.Cell>{patients[id].ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.Cell>{patients[id].occupation}</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row></Table.Row>
        </Table.Body>
      </Table>
      <Entries />
    </div>
  ) : null;
};

export default PatientDetail;

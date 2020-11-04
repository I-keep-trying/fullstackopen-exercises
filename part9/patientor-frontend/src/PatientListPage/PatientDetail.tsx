import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';

const PatientDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
        {patients[id].gender === 'male' ? (
          <h1>
            {' '}
            {patients[id].name} <i className="mars big icon"></i>
          </h1>
        ) : patients[id].gender === 'female' ? (
          <h1>
            {' '}
            {patients[id].name} <i className="venus big icon"></i>
          </h1>
        ) : (
          <h1>
            {' '}
            {patients[id].name} <i className="genderless big icon"></i>
          </h1>
        )}
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>SSN</Table.HeaderCell>
            <Table.HeaderCell>Date Of Birth</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{patients[id].name}</Table.Cell>
            <Table.Cell>{patients[id].gender}</Table.Cell>
            <Table.Cell>{patients[id].ssn}</Table.Cell>
            <Table.Cell>{patients[id].dateOfBirth}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ) : null;
};

export default PatientDetail;

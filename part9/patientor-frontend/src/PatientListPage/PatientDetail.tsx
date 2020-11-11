import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Icon, Button } from 'semantic-ui-react';
import { useStateValue, addPatient, addEntry } from '../state';
import { apiBaseUrl } from '../constants';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddHealthCheckEntryForm';
import { OccupationalEntryFormValues } from '../AddEntryModal/AddOccupationalEntryForm';

import AddHospitalEntryModal from '../AddEntryModal/AddHospitalEntryModal';
import AddHealthCheckEntryModal from '../AddEntryModal/AddHealthCheckEntryModal';
import AddOccupationalEntryModal from '../AddEntryModal/AddOccupationalEntryModal';

import { Patient } from '../types';
import Entries from './Entries';

const PatientDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(
    false
  );
  const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<
    boolean
  >(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<
    boolean
  >(false);

  const [error, setError] = React.useState<string | undefined>();

  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };
  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
    setError(undefined);
  };

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

  // ADD HOSPITAL ENTRY  //

  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeHospitalModal();
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  };

  // ADD HEALTH CHECK ENTRY //

  const submitNewHealthCheckEntry = async (
    values: HealthCheckEntryFormValues
  ) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeHealthCheckModal();
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  };

  const submitNewOccupationalEntry = async (
    values: OccupationalEntryFormValues
  ) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeOccupationalModal();
    } catch (e) {
      console.log(e);
      setError(e.response.data.error);
    }
  };

  return patients[id] ? (
    <Container>
      <Container as="h1" textAlign="center">
        {patients[id].name}
        {patients[id].gender === 'male' ? (
          <Icon className="mars big icon" />
        ) : patients[id].gender === 'female' ? (
          <Icon className="venus big icon" />
        ) : (
          <Icon className="genderless big icon" />
        )}
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
      <AddHospitalEntryModal
        hospitalModalOpen={hospitalModalOpen}
        onHospitalSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeHospitalModal}
      />
      <Button onClick={() => openHospitalModal()}>
        Add New Hospital Entry
      </Button>
      <AddHealthCheckEntryModal
        healthCheckModalOpen={healthCheckModalOpen}
        onHealthCheckSubmit={submitNewHealthCheckEntry}
        error={error}
        onClose={closeHealthCheckModal}
      />
      <Button onClick={() => openHealthCheckModal()}>
        Add New Health Check Entry
      </Button>
      <AddOccupationalEntryModal
        occupationalModalOpen={occupationalModalOpen}
        onSubmit={submitNewOccupationalEntry}
        error={error}
        onClose={closeOccupationalModal}
      />
      <Button onClick={() => openOccupationalModal()}>
        Add New Occupational Health Care Entry
      </Button>
    </Container>
  ) : null;
};

export default PatientDetail;

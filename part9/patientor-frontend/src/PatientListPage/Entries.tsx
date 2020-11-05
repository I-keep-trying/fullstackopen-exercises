import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Grid, Icon, Segment } from 'semantic-ui-react';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import { assertNever } from '../utils';
import { Entry, Diagnosis } from '../types';
import { nanoid } from 'nanoid';

const HealthCheck: FC<{ entry: Entry }> = ({ entry }) => {
  const [
    {
      //  patients,
      diagnoses,
    },
    //  dispatch
  ] = useStateValue();
  if (entry.type === 'HealthCheck') {
    return (
        <Grid>
            <Grid.Column>
                
            </Grid.Column>
        </Grid>
      <Table.Body key={entry.id}>
          <Segment>
        <Table.Row>
          <Table.Cell singleLine>{entry.type} </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell singleLine>{entry.date} </Table.Cell>
          <Table.Cell>{entry.description} </Table.Cell>
        </Table.Row>
        </Segment>
        {entry.diagnosisCodes ? (
          <>
            <Table.Row>
              <Table.Cell singleLine style={{ fontWeight: 'bold' }}>
                Diagnosis Codes{' '}
              </Table.Cell>
            </Table.Row>
            {entry.diagnosisCodes.map((dx) => {
              const getDx = Object.values(diagnoses).filter(
                (diagnosis: Diagnosis) => diagnosis.code === dx
              );
              const id = nanoid();
              return (
                <Table.Row key={id}>
                  <Table.Cell>{dx} </Table.Cell>
                  <Table.Cell>{getDx[0]?.name} </Table.Cell>
                </Table.Row>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Table.Body>
    );
  }
  return null;
};

const OccupationalHealthcare: FC<{ entry: Entry }> = ({ entry }) => {
  const [
    {
      //  patients,
      diagnoses,
    },
    //  dispatch
  ] = useStateValue();
  if (entry.type === 'OccupationalHealthcare') {
    return (
      <Table.Body key={entry.id}>
        <Table.Row>
          <Table.Cell singleLine>{entry.type} </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell singleLine>{entry.date} </Table.Cell>
          <Table.Cell>{entry.description} </Table.Cell>
        </Table.Row>

        {entry.diagnosisCodes ? (
          <>
            <Table.Row>
              <Table.Cell singleLine style={{ fontWeight: 'bold' }}>
                Diagnosis Codes{' '}
              </Table.Cell>
            </Table.Row>
            {entry.diagnosisCodes.map((dx) => {
              const getDx = Object.values(diagnoses).filter(
                (diagnosis: Diagnosis) => diagnosis.code === dx
              );
              const id = nanoid();
              return (
                <Table.Row key={id}>
                  <Table.Cell>{dx} </Table.Cell>
                  <Table.Cell>{getDx[0]?.name} </Table.Cell>
                </Table.Row>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Table.Body>
    );
  }
  return null;
};

const HospitalEntry: FC<{ entry: Entry }> = ({ entry }) => {
  const [
    {
      //  patients,
      diagnoses,
    },
    //  dispatch
  ] = useStateValue();
  if (entry.type === 'Hospital') {
    return (
      <Table.Body key={entry.id}>
        <Table.Row>
          <Table.Cell singleLine>{entry.type} </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell singleLine>{entry.date} </Table.Cell>
          <Table.Cell>{entry.description} </Table.Cell>
        </Table.Row>

        {entry.diagnosisCodes ? (
          <>
            <Table.Row>
              <Table.Cell singleLine style={{ fontWeight: 'bold' }}>
                Diagnosis Codes{' '}
              </Table.Cell>
            </Table.Row>
            {entry.diagnosisCodes.map((dx) => {
              const getDx = Object.values(diagnoses).filter(
                (diagnosis: Diagnosis) => diagnosis.code === dx
              );
              const id = nanoid();
              return (
                <Table.Row key={id}>
                  <Table.Cell>{dx} </Table.Cell>
                  <Table.Cell>{getDx[0]?.name} </Table.Cell>
                </Table.Row>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Table.Body>
    );
  }

  return null;
};

const EntryDetails: FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const Entries: FC = () => {
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

  const entries = (): Entry[] => {
    if (!patients[id]?.entries || patients[id].entries?.length === 0) {
      return [];
    }
    return patients[id].entries;
  };

  if (entries().length > 0) {
    return (
      <>
        <Container>
          <h2>Entries</h2>
        </Container>
        <Table celled>
          {entries().map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </Table>
      </>
    );
  }
  return null;
};

export default Entries;

/*  return (
              
            <Table.Body key={entry.id}>
              <Table.Row>
                <Table.Cell singleLine>{entry.date} </Table.Cell>
                <Table.Cell>{entry.description} </Table.Cell>
              </Table.Row>

              {entry.diagnosisCodes ? (
                <>
                  <Table.Row>
                    <Table.Cell singleLine style={{ fontWeight: 'bold' }}>
                      Diagnosis Codes{' '}
                    </Table.Cell>
                  </Table.Row>
                  {entry.diagnosisCodes.map((dx) => {
                    const getDx = Object.values(diagnoses).filter(
                      (diagnosis: Diagnosis) => diagnosis.code === dx
                    );
                    const id = nanoid();
                    return (
                      <Table.Row key={id}>
                        <Table.Cell>{dx} </Table.Cell>
                        <Table.Cell>{getDx[0]?.name} </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Table.Body>
          ); */

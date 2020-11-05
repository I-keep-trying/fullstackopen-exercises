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
      <>
        <Grid key={entry.id} columns={1}>
          <Segment>
            <Grid.Row>
              <Grid.Column>
                {' '}
                <Icon className="stethoscope big icon" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.date}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.description}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.specialist}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.healthCheckRating}</Grid.Column>
            </Grid.Row>
          </Segment>
          {entry.diagnosisCodes ? (
            <>
              <Segment>
                <Grid.Row>Diagnosis Codes</Grid.Row>
                {entry.diagnosisCodes.map((dx) => {
                  const getDx = Object.values(diagnoses).filter(
                    (diagnosis: Diagnosis) => diagnosis.code === dx
                  );
                  const id = nanoid();
                  return (
                    <>
                      <Grid.Row key={id}>{dx}</Grid.Row>
                      <Grid.Row>{getDx[0]?.name}</Grid.Row>
                    </>
                  );
                })}
              </Segment>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </>
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
      <>
        <Grid key={entry.id} columns={1}>
          <Segment>
            <Grid.Row>
              <Grid.Column>
                {' '}
                <Icon className="medkit big icon" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.date}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.description}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>{entry.specialist}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>{entry.employerName}</Grid.Column>
            </Grid.Row>
            {entry.sickLeave ? (
              <>
                <Grid.Row>
                  <Grid.Column>Sick Leave:</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{entry.sickLeave.startDate}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{entry.sickLeave.endDate}</Grid.Column>
                </Grid.Row>
              </>
            ) : (
              <></>
            )}
          </Segment>
          {entry.diagnosisCodes ? (
            <>
              <Segment>
                <Grid.Row>Diagnosis Codes</Grid.Row>
                {entry.diagnosisCodes.map((dx) => {
                  const getDx = Object.values(diagnoses).filter(
                    (diagnosis: Diagnosis) => diagnosis.code === dx
                  );
                  const id = nanoid();
                  return (
                    <>
                      <Grid.Row key={id}>{dx}</Grid.Row>
                      <Grid.Row>{getDx[0]?.name}</Grid.Row>
                    </>
                  );
                })}
              </Segment>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </>
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
      <>
        <Grid key={entry.id} columns={1}>
          <Segment>
            <Grid.Row>
              <Grid.Column>
                {' '}
                <Icon className="hospital outline big icon" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.date}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.description}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>{entry.specialist}</Grid.Column>
            </Grid.Row>
            {entry.discharge ? (
              <>
                <Grid.Row>
                  <Grid.Column>Sick Leave:</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{entry.discharge.date}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{entry.discharge.criteria}</Grid.Column>
                </Grid.Row>
              </>
            ) : (
              <></>
            )}
          </Segment>
          {entry.diagnosisCodes ? (
            <>
              <Segment>
                <Grid.Row>Diagnosis Codes</Grid.Row>
                {entry.diagnosisCodes.map((dx) => {
                  const getDx = Object.values(diagnoses).filter(
                    (diagnosis: Diagnosis) => diagnosis.code === dx
                  );
                  const id = nanoid();
                  return (
                    <>
                      <Grid.Row key={id}>{dx}</Grid.Row>
                      <Grid.Row>{getDx[0]?.name}</Grid.Row>
                    </>
                  );
                })}
              </Segment>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </>
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

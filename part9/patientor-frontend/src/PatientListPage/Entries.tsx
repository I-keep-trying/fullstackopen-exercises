import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Table,
  Grid,
  Icon,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import { assertNever } from '../utils';
import { Entry, Diagnosis } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';
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
        <Segment inverted>
          <Grid key={entry.id}>
            <Grid.Column width={16}>
              <Grid.Row columns={1}>
                <Icon
                  circular
                  inverted
                  color="green"
                  className="stethoscope big icon"
                />
                {entry.date}
              </Grid.Row>

              <Grid.Row columns={1}>{entry.description}</Grid.Row>
              <Grid.Row columns={1}>
                Specialist Name: {entry.specialist}
              </Grid.Row>
              <Divider horizontal></Divider>
              <Grid.Row columns={1}>
                Health Rating: <HealthRatingBar showText={false} rating={1} />
              </Grid.Row>

              <>
                {entry.diagnosisCodes ? (
                  <>
                    <Divider inverted horizontal>
                      Diagnosis Codes
                    </Divider>
                    {entry.diagnosisCodes.map((dx) => {
                      const getDx = Object.values(diagnoses).filter(
                        (diagnosis: Diagnosis) => diagnosis.code === dx
                      );
                      const id = nanoid();
                      return (
                        <>
                          <Grid.Row columns={1} key={id}>
                            {dx}
                            {getDx[0]?.name}
                          </Grid.Row>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            </Grid.Column>
          </Grid>
        </Segment>
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
        <Segment inverted>
          <Grid key={entry.id} columns={1}>
            <Grid.Column width={16}>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {' '}
                  <Icon
                    circular
                    inverted
                    color="red"
                    className="medkit big icon"
                  />
                  {entry.date}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>{entry.description}</Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>Specialist Name: {entry.specialist}</Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>Employer: {entry.employerName}</Grid.Column>
              </Grid.Row>
              {entry.sickLeave ? (
                <>
                  <Grid.Row>
                    <Grid.Column>
                      Sick Leave: {entry.sickLeave.startDate}
                      {' to '} {entry.sickLeave.endDate}
                    </Grid.Column>
                  </Grid.Row>
                </>
              ) : (
                <></>
              )}
              {entry.diagnosisCodes ? (
                <>
                  <Divider inverted horizontal>
                    Diagnosis Codes
                  </Divider>
                  {entry.diagnosisCodes.map((dx) => {
                    const getDx = Object.values(diagnoses).filter(
                      (diagnosis: Diagnosis) => diagnosis.code === dx
                    );
                    const id = nanoid();
                    return (
                      <>
                        <Grid.Row key={id}>
                          {dx} {' - '}
                          {getDx[0]?.name}{' '}
                        </Grid.Row>
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
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
        <Segment inverted>
          <Grid key={entry.id} columns={1}>
            <Grid.Column width={16}>
              <Grid.Row>
                <Grid.Column>
                  {' '}
                  <Icon
                    circular
                    inverted
                    color="blue"
                    className="hospital outline big icon"
                  />
                  {entry.date}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>{entry.description}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>Specialist Name: {entry.specialist}</Grid.Column>
              </Grid.Row>

              {entry.discharge ? (
                <>
                  <Grid.Row>
                    <Grid.Column>
                      Discharge Date: {entry.discharge.date}
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      Criteria: {entry.discharge.criteria}
                    </Grid.Column>
                  </Grid.Row>
                </>
              ) : (
                <></>
              )}
              {entry.diagnosisCodes ? (
                <>
                  <Grid.Row>
                    <Divider inverted horizontal>
                      Diagnosis Codes
                    </Divider>

                    {entry.diagnosisCodes.map((dx) => {
                      const getDx = Object.values(diagnoses).filter(
                        (diagnosis: Diagnosis) => diagnosis.code === dx
                      );
                      const id = nanoid();
                      return (
                        <>
                          <Grid.Row key={id}>
                            {dx}
                            {' - '} {getDx[0]?.name}
                          </Grid.Row>
                        </>
                      );
                    })}
                  </Grid.Row>
                </>
              ) : (
                <></>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
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

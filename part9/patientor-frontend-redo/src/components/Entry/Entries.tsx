import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  Grid,
  Accordion,
  Icon,
  Segment,
  Header,
  Label,
} from 'semantic-ui-react';
import AnimateHeight from 'react-animate-height';
import { useStateValue } from '../../state';
import { Entry, Diagnosis } from '../../types';
import HospitalEntry from './HospitalEntry';
import { HealthEntry } from './HealthCheckEntry';
import OccupationalEntry from './OccupationalEntry';
import { nanoid } from 'nanoid';

export const EntryDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }] = useStateValue();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClick = (index: number) => {
    const newIndex: number = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const entries = (): Entry[] => {
    if (!patients[id]?.entries || patients[id].entries?.length === 0) {
      return [];
    }
    return patients[id].entries;
  };

  if (entries().length > 0) {
    return (
      <>
        {entries().map((entry, index: number) => {
          const active = index === activeIndex ? 'active' : '';

          return (
            <Accordion fluid styled key={entry.id}>
              <Accordion.Title
                className={`title ${active}`}
                onClick={() => handleClick(index)}
              >
                <Grid divided>
                  <Grid.Row columns={2}>
                    <Grid.Column mobile={7} tablet={3} computer={3}>
                      <Icon name="dropdown" />
                      {entry.date}
                    </Grid.Column>
                    <Grid.Column>{entry.type}</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Accordion.Title>
              <AnimateHeight height={activeIndex === index ? 'auto' : 0}>
                <Table compact definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Description</Table.Cell>
                      <Table.Cell className="word-break">
                        {entry.description}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Specialist</Table.Cell>
                      <Table.Cell className="word-break">
                        {entry.specialist}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      {entry.diagnosisCodes ? (
                        entry.diagnosisCodes?.map((dx) => {
                          const getDx = Object.values(diagnoses).filter(
                            (diagnosis: Diagnosis) => diagnosis.code === dx
                          );
                          const id = nanoid();
                          return (
                            <>
                              <Table.Cell>Diagnoses</Table.Cell>
                              <Table.Cell key={id}>
                                <Label basic horizontal color="teal">
                                  {dx}
                                </Label>{' '}
                                {getDx[0]?.name}
                              </Table.Cell>
                            </>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Table.Row>
                  </Table.Body>
                </Table>
              </AnimateHeight>
              <Accordion.Content className={`content ${active}`}>
                {entry.type === 'Hospital' ? (
                  <HospitalEntry entry={entry} />
                ) : entry.type === 'HealthCheck' ? (
                  <HealthEntry entry={entry} />
                ) : (
                  <OccupationalEntry entry={entry} />
                )}
                {/* 
                {entry.diagnosisCodes?.map(() => {
                  return <Diagnoses entry={entry} />;
                })} */}
              </Accordion.Content>
            </Accordion>
          );
        })}
      </>
    );
  } else {
    return (
      <Segment attached placeholder>
        <Header as="h2" icon>
          <Icon name="doctor" />
          No patient history has been recorded yet
        </Header>
      </Segment>
    );
  }
};

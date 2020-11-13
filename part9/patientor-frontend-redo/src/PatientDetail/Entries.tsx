import React, {
  FC,
  // useEffect
} from 'react';
//import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Accordion, Label, Divider, List } from 'semantic-ui-react';
import {
  useStateValue,
  // addPatient
} from '../state';
//import { apiBaseUrl } from '../constants';
import { assertNever } from '../utils';
import { Entry, Diagnosis } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';
import { nanoid } from 'nanoid';

/* from types.ts
export type Entry =
  | HealthCheckEntry
  | OccupationalHealthCareEntry
  | HospitalEntry;
*/

/* same as what I already have
interface EntryDetailsProps {
  entry: Entry;
} */

/* BASE ENTRY
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
*/

export const BaseEntry: FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <List>
      <List.Item>
        <Label basic horizontal>
          Description
        </Label>
        {entry.description}
      </List.Item>
      <List.Item>
        <Label basic horizontal>
          Specialist
        </Label>
        {entry.specialist}
      </List.Item>
    </List>
  );
};

export const EntryTypeDetails: FC<{ entry: Entry }> = ({ entry }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handleSelect = () => {
    setActiveIndex(activeIndex === 0 ? -1 : 0);
  };
  console.log('entry', entry);
  switch (entry.type) {
    case 'Hospital':
      return (
        <div key={entry.id}>
          <Accordion.Title
            active={activeIndex === 0}
            index={activeIndex}
            onClick={handleSelect}
          >
            {entry.date}
            <Icon color="blue" className="hospital outline big icon" />
            {entry.type}
          </Accordion.Title>
          <BaseEntry entry={entry} />

          <Accordion.Content>
            <Label>Discharge Notes:</Label>
            <Label basic horizontal>
              {' '}
              Date:{' '}
            </Label>{' '}
            {entry.discharge.date}
            <Label basic horizontal>
              {' '}
              Criteria:{' '}
            </Label>{' '}
            {entry.discharge.criteria}
          </Accordion.Content>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <Accordion key={entry.id}>
          <Accordion.Title>
            {entry.date}
            <Icon color="red" className="medkit big icon" />
            <Label basic horizontal>
              {entry.type}
            </Label>
          </Accordion.Title>
          <Accordion.Content>
            <BaseEntry entry={entry} />
            <Label basic horizontal>
              Employment:
            </Label>{' '}
            {entry.employerName}
            {entry.sickLeave ? (
              <>
                <Label>Sick Leave:</Label> Start: {entry.sickLeave.startDate}{' '}
                End: {entry.sickLeave.endDate}
              </>
            ) : (
              <></>
            )}
          </Accordion.Content>
        </Accordion>
      );
    case 'HealthCheck':
      return (
        <Accordion key={entry.id}>
          <Accordion.Title>
            {entry.date}
            <Icon color="green" className="stethoscope big icon" />
            <Label basic horizontal>
              {entry.type}
            </Label>
          </Accordion.Title>
          <Accordion.Content>
            <BaseEntry entry={entry} />
            <Label basic horizontal>
              Health Status:
            </Label>
            <HealthRatingBar
              rating={entry.healthCheckRating}
              showText={true}
              showRating={false}
            />
          </Accordion.Content>
        </Accordion>
      );
    default:
      return assertNever(entry);
  }
};

export const EntryDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }] = useStateValue();

  const entries = (): Entry[] => {
    if (!patients[id]?.entries || patients[id].entries?.length === 0) {
      return [];
    }
    return patients[id].entries;
  };

  if (entries().length > 0) {
    return (
      <>
        {entries().map((entry) => {
          return (
            <div key={entry.id}>
              <EntryTypeDetails entry={entry} />

              {entry.diagnosisCodes?.map((dx) => {
                const getDx = Object.values(diagnoses).filter(
                  (diagnosis: Diagnosis) => diagnosis.code === dx
                );
                const id = nanoid();
                return (
                  <List>
                    <List.Item>
                      <Label key={id} basic horizontal color="teal">
                        {dx}
                      </Label>{' '}
                      {getDx[0]?.name}
                    </List.Item>
                  </List>
                );
              })}
            </div>
          );
        })}
      </>
    );
  }
  return null;
};

/* 
const HealthCheck: FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  if (entry.type === 'HealthCheck') {
    return (
      <List inverted>
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
            <Grid.Row columns={1}>Specialist Name: {entry.specialist}</Grid.Row>
            <Divider horizontal></Divider>
            <Grid.Row columns={1}>
              Health Rating: <HealthRatingBar showText={false} rating={1} />
            </Grid.Row>

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
                    <Grid.Row columns={1} key={id}>
                      {dx}
                      {getDx[0]?.name}
                    </Grid.Row>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Grid.Column>
        </Grid>
      </List>
    );
  }
  return null;
};

const OccupationalHealthcare: FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (entry.type === 'OccupationalHealthcare') {
    return (
      <List inverted>
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
            
            <Grid.Row columns={1}>
              <Grid.Column>
               
              </Grid.Column>
            </Grid.Row>
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
                    <Grid.Row key={id}>
                      {dx} {' - '}
                      {getDx[0]?.name}{' '}
                    </Grid.Row>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Grid.Column>
        </Grid>
      </List>
    );
  }
  return null;
};

const HospitalEntry: FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  if (entry.type === 'Hospital') {
    return (
      <List inverted>
        <Grid columns={1}>
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
            <Grid.Row>
            <Divider inverted horizontal>
                    Diagnosis Codes
                  </Divider>
                  {entry.diagnosisCodes?.map((dx) => {
                    const getDx = Object.values(diagnoses).filter(
                      (diagnosis: Diagnosis) => diagnosis.code === dx
                    );
                    const id = nanoid();
                    return (
                      <Grid.Row key={id}>
                        {dx}
                        {' - '} {getDx[0]?.name}
                      </Grid.Row>
                    );
                  })}
            </Grid.Row>

          </Grid.Column>
        </Grid>
      </List>
    );
  }

  return null;
};
*/

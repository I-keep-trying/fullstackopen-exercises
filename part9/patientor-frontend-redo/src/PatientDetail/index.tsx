import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  Container,
  Divider,
  Menu,
  Header,
  Icon,
  List,
  Label,
} from 'semantic-ui-react';
//import AddEntry from '../AddEntryForm';
//import { EntryFormValues } from '../AddEntryForm/AddEntryForm';
import { EntryDetails } from './Entries';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient } from '../state';
import { Entry } from '../types';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const entries = (): Entry[] => {
    if (!patients[id]?.entries || patients[id].entries?.length === 0) {
      return [];
    }
    return patients[id].entries;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeIndex, setActiveIndex] = React.useState<string>('entries');

  /*   const handleCancel = () => {
    setActiveIndex(activeIndex === 0 ? -1 : 0);
  }; */

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

  /*   if (onePatient === undefined) {
    return <Header as="h3">{`No Patient with ID="${id}" exists.`}</Header>;
  } */

  /*   const submitNewEntry = async (values: EntryFormValues) => {
    const { data: submittedEntry } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      values
    );
    dispatch(singlePatient(submittedEntry));
    handleCancel();
  }; */

  return patients[id] ? (
    <Container>
      <Header as="h2">
        {patients[id].name}
        <Icon
          style={{ fontSize: '1em', verticalAlign: 'inherit' }}
          className={
            patients[id].gender !== 'other'
              ? patients[id].gender === 'male'
                ? 'mars big icon'
                : 'venus big icon'
              : 'other gender big icon'
          }
        />
      </Header>
      <Divider />
      <List divided relaxed>
        <List.Item>
          <Label basic horizontal>
            GENDER
          </Label>
          {patients[id].gender}
        </List.Item>
        <List.Item>
          <Label basic horizontal>
            SSN
          </Label>
          {patients[id].ssn}
        </List.Item>
        <List.Item>
          <Label basic horizontal>
            OCCUPATION
          </Label>
          {patients[id].occupation}
        </List.Item>
        <List.Item>
          <Label basic horizontal>
            D.O.B.
          </Label>
          {patients[id].dateOfBirth}{' '}
        </List.Item>

        <List.Item></List.Item>
      </List>
      <Menu pointing>
        {entries() ? (
          <Menu.Item
            name="entries"
            active={activeIndex === 'entries'}
            as={'h2'}
          />
        ) : (
          <></>
        )}
        <Menu.Item>Add New Entry </Menu.Item>
      </Menu>
      <Accordion>
      <EntryDetails />

      </Accordion>
      <Container>

      </Container>
      {/*         <AddEntry
          onSubmit={submitNewEntry}
          onCancel={handleCancel}
          activeIndex={activeIndex}
        />
 */}

      <Divider hidden />
    </Container>
  ) : (
    <></>
  );
};

export default PatientPage;

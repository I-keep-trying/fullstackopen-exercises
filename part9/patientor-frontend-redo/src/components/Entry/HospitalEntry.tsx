import React, { FC } from 'react';
import {
  Label,
  List,
} from 'semantic-ui-react';
import { HospitalEntry } from '../../types';

const HospitalEntry1: FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div key={entry.id}>
{/*       <List.Item>
        <List.Icon color="blue" className="hospital outline big icon" />
      </List.Item> */}

      <List.List>
        <Label basic>Discharge Notes:</Label>

        <List.Item>
          <Label basic horizontal>
            {' '}
            Date:{' '}
          </Label>{' '}
          {entry.discharge.date}
        </List.Item>
        <List.Item>
          <Label basic horizontal>
            {' '}
            Criteria:{' '}
          </Label>{' '}
          {entry.discharge.criteria}
        </List.Item>
      </List.List>
    </div>
  );
};

export default HospitalEntry1;

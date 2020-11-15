import React, { FC } from 'react';
import { List, Label } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../../types';

const OccupationalEntry: FC<{ entry: OccupationalHealthCareEntry }> = ({
  entry,
}) => {
  return (
    <div key={entry.id}>
      {/*       <List.Item>
        <Icon color="red" className="medkit big icon" />
      </List.Item> */}
      <List.List>
        <List.Item>
          <Label basic horizontal>
            Employment
          </Label>{' '}
          {entry.employerName}
        </List.Item>

        {entry.sickLeave ? (
          <List.Item>
            <Label basic horizontal>
              Sick Leave
            </Label>
            <Label basic horizontal>
              Start:{' '}
            </Label>
            {entry.sickLeave.startDate}
            <Label basic horizontal>
              End:{' '}
            </Label>
            {entry.sickLeave.endDate}
          </List.Item>
        ) : (
          <></>
        )}
      </List.List>
    </div>
  );
};

export default OccupationalEntry;

import React, { FC } from 'react';
import {
  List, Label
} from 'semantic-ui-react';
import {  HealthCheckEntry } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

export const HealthEntry: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  if (entry.type === 'HealthCheck') {
    return (
      <div key={entry.id}>
{/*       <List.Item>
        <Icon color="green" className="stethoscope big icon" />
      </List.Item>
 */}
      <List.List>
        <Label basic horizontal>
          Health Status Description
        </Label>

        <List.Item>
          <HealthRatingBar
            rating={entry.healthCheckRating}
            showText={true}
            showRating={false}
          />
        </List.Item>
      </List.List>
    </div>
    );
  }
  return null;
}; 
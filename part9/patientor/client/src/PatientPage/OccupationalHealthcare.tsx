import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const style = { margin: 10 };

const OccupationalHealthcare= (entry: OccupationalHealthcareEntry): JSX.Element => {
    
    if (entry.diagnosisCodes){
        console.log("Occupational diagnosis code:", entry.diagnosisCodes);
      }
    
    return (
        <div>
            <Card style={style}>
            <Card.Content>
                {entry.date} <Icon name="user doctor" />
            </Card.Content>
            <Card.Content description={entry.description} />
            <Card.Content>
                diagnosed by {entry.specialist}
            </Card.Content>
            </Card>
        </div>
);};

export default OccupationalHealthcare;
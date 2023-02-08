import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const style = { margin: 10 };

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    
    if (entry.diagnosisCodes){
        console.log("Hospital diagnosis code:", entry.diagnosisCodes);
      }
    return(
        <div>
            <Card style={style}>
            <Card.Content>
                {entry.date} <Icon name="hospital symbol" />
            </Card.Content>
            <Card.Content description={entry.description} />
            <Card.Content description={entry.diagnosisCodes} />
            </Card>
        </div>
);
};

export default Hospital;
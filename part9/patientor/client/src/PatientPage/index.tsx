import { Entry, Patient,  } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare {...entry} />;
    case 'HealthCheck':
      return <HealthCheck {...entry} />;
    default:
      return assertNever(entry);
  }
};


const PatientListPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const [{ diagnoses }] = useStateValue();

  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  let iconName: 'Male' | 'Female' | 'Transgender' | 'Wc';

  if(patient){  
    switch (patient.gender) {
      case 'male':
        iconName = 'Male';
        break;
      case 'female':
        iconName = 'Female';
        break;
      case 'other':
        iconName = 'Transgender';
        break;
      default:
        iconName = 'Wc';
    }

    const Icon = MuiIcons[iconName as keyof typeof MuiIcons];
    

    return (
      <div>
        <h2>
          {patient.name} <Icon/>{' '}
        </h2>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry, i) => (
          <div key={i}>
            {Object.keys(diagnoses).length === 0 ? null : (
              <EntryDetails entry={entry} />
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default PatientListPage;

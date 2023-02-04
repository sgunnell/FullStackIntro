import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';
const PatientListPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();

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
        
        <h4>
          {patient.name} <Icon/>
        </h4>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry)=>(
          <p key ={patient.id}> {entry.date} <i> {entry.description}</i></p>
        ))}
        
      </div>
    );
  }
  return null;
};

export default PatientListPage;

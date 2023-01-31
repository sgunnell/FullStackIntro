import patientData from "../../data/patients";
import { Patient, NonSensitivePatientData } from "../types";


const getPatients = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient
};
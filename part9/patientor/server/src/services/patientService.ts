import patientsData from "../../data/patients";
import { Patient, NonSensitivePatientData, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient ): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  addPatient
};
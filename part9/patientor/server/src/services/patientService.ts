import patientsData from "../../data/patients";
import { Patient, NonSensitivePatientData, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getOne = (id: string): NonSensitivePatientData | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const getNonSensitivePatientsData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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
  getOne,
  getNonSensitivePatientsData,
  addPatient
};
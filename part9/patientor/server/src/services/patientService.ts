import patientsData from "../../data/patients";
import { Patient, NonSensitivePatientData, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<NonSensitivePatientData> = patientsData.map(
  ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  })
);

const getAll = (): Array<NonSensitivePatientData> => {
  return patients;
};

const getOne = (id: string): NonSensitivePatientData | undefined => {
  return patients.find((patient) => patient.id === id);
};


const addPatient = (entry: NewPatient ): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getOne,
  addPatient
};
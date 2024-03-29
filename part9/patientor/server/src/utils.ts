import { NewPatient, Gender, Entry } from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};
  
const parseValue = (value: unknown, field: string): string => {
    if (!value || !isString(value)) {
      throw new Error(`Incorrect or missing ${field}: ${value}`);
    }
    return value;
 };
  
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
  
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
  
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};

const toNewPatient = (object: any): NewPatient => {
    const newEntry: NewPatient = {
      name: parseValue(object.name, "name"),
      ssn: parseValue(object.ssn, "ssn"),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseValue(object.occupation, "occupation"),
      gender: parseGender(object.gender),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  };
  
  export default toNewPatient;
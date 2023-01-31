import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';


const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoseData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};
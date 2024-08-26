import axios from "axios";
import {  Patient, PatientFormValues } from "../types";

// import { apiBaseUrl } from "../constants";
import { NewEntry } from "../components/types/newEntrytypes";



const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

const getAll = async () => {
  console.log(baseUrl);
  const { data } = await axios.get<Patient[]>(
    `${baseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${baseUrl}/patients`,
    object
  );

  return data;
};

const getPatientById = async (id:string):Promise<Patient | null>=> {
try{
  const patient = await axios.get<Patient>(`${baseUrl}/patients/${id}`).then(res => res.data);
  return patient;
} catch (error) {
  throw new Error('cannot get patient from id');

  }
};


const addNewEntry = async (entry:NewEntry, patientId:string):Promise <Patient | null> => {
  try {
    const updatedPatient = await axios.post<Patient>(`${baseUrl}/patients/entry/${patientId}`, entry).then(res => res.data);
    return updatedPatient;
  } catch (error) {
    throw new Error('cannot add new entry');
  }
};

export default {
  getAll, create , getPatientById, addNewEntry
};


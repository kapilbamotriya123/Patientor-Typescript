//this was used to send the data stored locally to database

/*

import { DiagnoseModel } from "../models/diagnosis";
import diagnoseData from '../../data/diagnoses';
import { PatientModel } from "../models/patient";
import { data } from "../../data/patients";
import { toNewPatient } from "./toNewPatient";

export const initiliaseDiagnoses = async() => {
    const count = await DiagnoseModel.countDocuments();
    if (count === 0) {
        await DiagnoseModel.insertMany(diagnoseData);
        console.log("inilialised database with diagnoses entry");
    } else {
        console.log('database has been already initialises with diagnoses');
    }
};

export const initializeDatabase = async () => {
    try {
      const count = await PatientModel.countDocuments();
      if (count === 0) {
        const patients = data.map(patient => {
          const convertedPatient = toNewPatient(patient);
          return { ...convertedPatient, id: patient.id };
        });
        await PatientModel.insertMany(patients);
        console.log('Database initialized with patient data');
      } else {
        console.log('Database already contains patient data');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  */
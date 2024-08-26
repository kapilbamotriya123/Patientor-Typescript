import { Entry, NewPatient, PatientsWoSsn } from "../../types";
import { Patients } from "../../types";
import { parseEntry } from "../utils/toNewPatient";
import { PatientModel } from "../models/patient";
import mongoose from "mongoose";


export const getPatients = async (): Promise<PatientsWoSsn[]> => {
    const patients = await PatientModel.find({}, { ssn: 0, entries: 0 });
    // console.log(patients);
    return patients;
  };

export const getPatientById = async (patientId:string): Promise<Patients> => {
    const patient = await PatientModel.findById(patientId);
    if(patient) {
        return patient;
    } else {
        throw new Error('failed to get patient by id');
    }
};

export const addPatient = async (patient: NewPatient):Promise<Patients> => {
    const newPatient = new PatientModel(patient);
    const returnedPatient = await newPatient.save();
    return returnedPatient;
};

export const addEntry = async (entry: unknown, patientId:Patients['id']):Promise<Patients> => {

    if(typeof entry === 'object') {
        const newEntry:Entry = parseEntry({
            ...entry,
            id: new mongoose.Types.ObjectId().toString() , 
        });
        const updatedPatient = await PatientModel.findByIdAndUpdate(patientId, 
            {$push: {entries: newEntry}},
            {new: true, runValidators: true}
        );

        if (updatedPatient ) {
            return updatedPatient;
        } else {
            throw new Error('could not add patient entries');
        }
    } else {
        throw new Error('invalid entry');
    }
};

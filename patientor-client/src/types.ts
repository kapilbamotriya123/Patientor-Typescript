export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface  HospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave:SickLeave;
  type: 'OccupationalHealthcare';
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
  }


export interface HealthCheckEntry  extends BaseEntry {
  healthCheckRating: HealthCheckRating;
  type: 'HealthCheck'
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry 
  | HealthCheckEntry ;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" >;
type BaseEntry = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  };
  
  type HospitalEntry = BaseEntry & {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  };
  
  type OccupationalHealthcareEntry = BaseEntry & {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  };
  
  type HealthCheckEntry = BaseEntry & {
    type: "HealthCheck";
    healthCheckRating: number;
  };
  
export type NewEntry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
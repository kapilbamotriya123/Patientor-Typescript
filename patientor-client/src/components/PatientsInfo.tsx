import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Navigate, useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import diagnoseService from '../services/diagnose';
import PatientEntries from './PatientEntries';
import NewEntryForm from "./NewEntryForm";

interface PatientInfoProps {
  setNotification: Dispatch<SetStateAction<string>>;
}

const PatientInfo = ({setNotification}:PatientInfoProps ) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [diagnoseData, setDiagnoseData] = useState<Diagnosis[]>([]);

  const params = useParams();
  let id = '';

  if (typeof params.id === 'string') {
    id = params.id;
  }

  useEffect(() => {
    const fetchPatientAndDiagnoses = async () => {
      try {
        const fetchedPatient = await patientService.getPatientById(id);
        const fetchedDiagnoses = await diagnoseService.getAllDiagnoses();
        setDiagnoseData(fetchedDiagnoses);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAndDiagnoses();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (patient) {
    return (
      <div className="patient-info">
        <h1 className="patient-name">{patient.name}</h1>
        <div className="patient-details">
          <p><span className="detail-label">Gender:</span> {patient.gender}</p>
          <p><span className="detail-label">SSN:</span> {patient.ssn}</p>
          <p><span className="detail-label">Occupation:</span> {patient.occupation}</p>
        </div>

        <h3 className="entries-title">Entries</h3>
        <div className="entries-list">
          {patient.entries.map(entry => (
            <PatientEntries entry={entry} key={entry.id} diagnoseData={diagnoseData} />
          ))}
        </div>
        <NewEntryForm 
          
          diagnoseData={diagnoseData} 
          setNotification={setNotification} 
          patientId={id} 
          setPatient={setPatient}
        />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default PatientInfo;
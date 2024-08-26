import { useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { Link } from "react-router-dom";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>

}

const PatientListPage = ({ patients, setPatients } : Props ) => {
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  
  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      // console.log(patient);
      // console.log(patients.concat(patient));
      // return;
      setModalOpen(false);
      setPatients(patients.concat(patient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          // setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if(!patients) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="patient-list-page">
      <h2 className="page-title">Patient list</h2>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Health Rating</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(patients).map((patient) => (
            <tr key={patient.id}>
              <td>
                <Link to={`/patients/${patient.id}`} className="patient-link">
                  {patient.name}
                </Link>
              </td>
              <td>{patient.gender}</td>
              <td>{patient.occupation}</td>
              <td>
                <HealthRatingBar showText={false} rating={1} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
        setError={setError}
      />
      <button className="add-patient-button" onClick={() => openModal()}>
        Add New Patient
      </button>
    </div>
  );
};

export default PatientListPage;

import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import { Button, Divider, Container, Typography } from '@mui/material';

// import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import logo from './assets/hospital-svgrepo-com.svg';

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientsInfo";
import '../src/components/styles/App.css';
import '../src/components/styles/patientInfo.css';
import '../src/components/styles/patientEntries.css';
import '../src/components/styles/patientListPage.css';
import '../src/components/styles/addPatientForm.css';


import '../src/components/styles/newEntry.css';

import '../src/components/styles/notif.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    void axios.get<void>(`${baseUrl}/api/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  useEffect( () => {
    setTimeout(() => {
        setNotification('');
    }, 3000);
  }, [notification]);

  if (!patients) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="app">
      <Router>
        <div className="container">
          <div className="app-head-wrapper">
            <div className="logo-wrapper">

              <img src={logo} alt="logo" className="logo" />
              <h1 className="app-title">Patientor</h1>
            </div>
            <Link to="/" className="home-button">Home</Link>
          </div>
            <hr className="hr"></hr>
          <div className="divider"></div>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
              <Route path="/patients/:id" element={<PatientInfo setNotification={setNotification} />} />
            </Routes>
          </main>
        </div>
      </Router>
      <div className="bottom-padding"></div>
      <footer className="footer">
        <p>©️ KapilBamotriya2024</p>
      </footer>
      {notification !== "" && 
        <div className="notification">
          <p>{notification}</p>
        </div>
      }
    </div>
  );
};

export default App;

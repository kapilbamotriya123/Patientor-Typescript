import { useState, SyntheticEvent } from "react";

// import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;

}

interface GenderOption{
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit , setError}: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    let invalidEntries = false;
    [name, occupation, ssn, dateOfBirth, gender].forEach(e => {
      if (e==='') {
        invalidEntries = true;
      }
    });
    if(invalidEntries) {
      setError('all fields are required');
      return;
    }
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
      entries:[]
    });
  };

 return (
  <div className="add-patient-form">
    <form onSubmit={addPatient}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="ssn">Social security number</label>
        <input
          id="ssn"
          type="text"
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="dateOfBirth">Date of birth</label>
        <input
          id="dateOfBirth"
          type="date"
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="occupation">Occupation</label>
        <input
          id="occupation"
          type="text"
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={onGenderChange}
        >
          {genderOptions.map(option => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="button button-primary"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  </div>
);
};

export default AddPatientForm;
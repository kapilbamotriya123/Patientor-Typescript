"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PatientEntries = ({ entry, diagnoseData }) => {
    const getDiagnosisName = (code) => {
        if (!diagnoseData)
            return 'Unknown diagnosis';
        const diagnosis = diagnoseData.find(d => d.code === code);
        return diagnosis ? diagnosis.name : 'Unknown diagnosis';
    };
    if (!entry) {
        return (<div>Loading...</div>);
    }
    return (<div className="patient-entry-container">
      <ul className="patient-entry-list">
        <li className="patient-entry-item">
          <div className="patient-entry-date">{entry.date}</div>
          <div className="patient-entry-description">{entry.description}</div>
        </li>
        <li className="patient-entry-item">
          <div className="patient-entry-diagnoses-title">Diagnoses</div>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (<div className="patient-entry-diagnoses-list">
              {entry.diagnosisCodes.map((d) => (<div key={d} className="patient-entry-diagnosis-item">
                  <div className="patient-entry-diagnosis-code">
                    <strong>{d}</strong>
                  </div>
                  <div className="patient-entry-diagnosis-name">{getDiagnosisName(d)}</div>
                </div>))}
            </div>)}
        </li>
        <li className="patient-entry-item">
          <div className="patient-entry-specialist">Diagnosed by: {entry.specialist}</div>
        </li>
      </ul>
    </div>);
};
exports.default = PatientEntries;

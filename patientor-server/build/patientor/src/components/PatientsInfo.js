"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const patients_1 = __importDefault(require("../services/patients"));
const diagnose_1 = __importDefault(require("../services/diagnose"));
const PatientEntries_1 = __importDefault(require("./PatientEntries"));
const NewEntryForm_1 = __importDefault(require("./NewEntryForm"));
const PatientInfo = ({ setNotification }) => {
    const [patient, setPatient] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [diagnoseData, setDiagnoseData] = (0, react_1.useState)([]);
    const params = (0, react_router_dom_1.useParams)();
    let id = '';
    if (typeof params.id === 'string') {
        id = params.id;
    }
    (0, react_1.useEffect)(() => {
        const fetchPatientAndDiagnoses = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const fetchedPatient = yield patients_1.default.getPatientById(id);
                const fetchedDiagnoses = yield diagnose_1.default.getAllDiagnoses();
                setDiagnoseData(fetchedDiagnoses);
                setPatient(fetchedPatient);
            }
            catch (error) {
                console.error("Failed to fetch patient data:", error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchPatientAndDiagnoses();
    }, [id]);
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (patient) {
        return (<div className="patient-info">
        <h1 className="patient-name">{patient.name}</h1>
        <div className="patient-details">
          <p><span className="detail-label">Gender:</span> {patient.gender}</p>
          <p><span className="detail-label">SSN:</span> {patient.ssn}</p>
          <p><span className="detail-label">Occupation:</span> {patient.occupation}</p>
        </div>

        <h3 className="entries-title">Entries</h3>
        <div className="entries-list">
          {patient.entries.map(entry => (<PatientEntries_1.default entry={entry} key={entry.id} diagnoseData={diagnoseData}/>))}
        </div>
        <NewEntryForm_1.default diagnoseData={diagnoseData} setNotification={setNotification} patientId={id} setPatient={setPatient}/>
      </div>);
    }
    else {
        return <react_router_dom_1.Navigate to="/"/>;
    }
};
exports.default = PatientInfo;

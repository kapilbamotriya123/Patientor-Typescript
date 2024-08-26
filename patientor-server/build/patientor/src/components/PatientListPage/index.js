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
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
const axios_1 = __importDefault(require("axios"));
const AddPatientModal_1 = __importDefault(require("../AddPatientModal"));
const HealthRatingBar_1 = __importDefault(require("../HealthRatingBar"));
const patients_1 = __importDefault(require("../../services/patients"));
const react_router_dom_1 = require("react-router-dom");
const PatientListPage = ({ patients, setPatients }) => {
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewPatient = (values) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const patient = yield patients_1.default.create(values);
            // console.log(patient);
            // console.log(patients.concat(patient));
            // return;
            setModalOpen(false);
            setPatients(patients.concat(patient));
        }
        catch (e) {
            if (axios_1.default.isAxiosError(e)) {
                if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) && typeof ((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    // setError(message);
                }
                else {
                    setError("Unrecognized axios error");
                }
            }
            else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    });
    if (!patients) {
        return (<div>Loading...</div>);
    }
    return (<div className="patient-list-page">
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
          {Object.values(patients).map((patient) => (<tr key={patient.id}>
              <td>
                <react_router_dom_1.Link to={`/patients/${patient.id}`} className="patient-link">
                  {patient.name}
                </react_router_dom_1.Link>
              </td>
              <td>{patient.gender}</td>
              <td>{patient.occupation}</td>
              <td>
                <HealthRatingBar_1.default showText={false} rating={1}/>
              </td>
            </tr>))}
        </tbody>
      </table>
      <AddPatientModal_1.default modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal} setError={setError}/>
      <button className="add-patient-button" onClick={() => openModal()}>
        Add New Patient
      </button>
    </div>);
};
exports.default = PatientListPage;

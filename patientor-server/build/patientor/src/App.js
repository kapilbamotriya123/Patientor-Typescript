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
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const hospital_svgrepo_com_svg_1 = __importDefault(require("./assets/hospital-svgrepo-com.svg"));
const patients_1 = __importDefault(require("./services/patients"));
const PatientListPage_1 = __importDefault(require("./components/PatientListPage"));
const PatientsInfo_1 = __importDefault(require("./components/PatientsInfo"));
require("../src/components/styles/App.css");
require("../src/components/styles/patientInfo.css");
require("../src/components/styles/patientEntries.css");
require("../src/components/styles/patientListPage.css");
require("../src/components/styles/addPatientForm.css");
require("../src/components/styles/newEntry.css");
require("../src/components/styles/notif.css");
const App = () => {
    const [patients, setPatients] = (0, react_1.useState)([]);
    const [notification, setNotification] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        void axios_1.default.get(`http://localhost:3001/api/ping`);
        const fetchPatientList = () => __awaiter(void 0, void 0, void 0, function* () {
            const patients = yield patients_1.default.getAll();
            setPatients(patients);
        });
        void fetchPatientList();
    }, []);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setNotification('');
        }, 3000);
    }, [notification]);
    if (!patients) {
        return (<div>Loading...</div>);
    }
    return (<div className="app">
      <react_router_dom_1.BrowserRouter>
        <div className="container">
          <div className="app-head-wrapper">
            <div className="logo-wrapper">

              <img src={hospital_svgrepo_com_svg_1.default} alt="logo" className="logo"/>
              <h1 className="app-title">Patientor</h1>
            </div>
            <react_router_dom_1.Link to="/" className="home-button">Home</react_router_dom_1.Link>
          </div>
            <hr className="hr"></hr>
          <div className="divider"></div>
          <main className="main-content">
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route path="/" element={<PatientListPage_1.default patients={patients} setPatients={setPatients}/>}/>
              <react_router_dom_1.Route path="/patients/:id" element={<PatientsInfo_1.default setNotification={setNotification}/>}/>
            </react_router_dom_1.Routes>
          </main>
        </div>
      </react_router_dom_1.BrowserRouter>
      <div className="bottom-padding"></div>
      <footer className="footer">
        <p>©️ KapilBamotriya2024</p>
      </footer>
      {notification !== "" &&
            <div className="notification">
          <p>{notification}</p>
        </div>}
    </div>);
};
exports.default = App;

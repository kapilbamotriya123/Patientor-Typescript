"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_select_1 = __importDefault(require("react-select"));
const patients_1 = __importDefault(require("../services/patients"));
const react_2 = __importDefault(require("react"));
require("./styles/formStyle.css");
const NewEntryForm = ({ diagnoseData, setNotification, patientId, setPatient }) => {
    // State for form inputs
    const [description, setDescription] = (0, react_1.useState)('');
    const [date, setDate] = (0, react_1.useState)('');
    const [specialist, setSpecialist] = (0, react_1.useState)('');
    const [diagnosisCodes, setDiagnosisCodes] = (0, react_1.useState)([]);
    const [type, setType] = (0, react_1.useState)('');
    const [discharge, setDischarge] = (0, react_1.useState)({ date: '', criteria: '' });
    const [employerName, setEmployerName] = (0, react_1.useState)('');
    const [sickLeave, setSickLeave] = (0, react_1.useState)({ startDate: '', endDate: '' });
    const [healthCheckRating, setHealthCheckRating] = (0, react_1.useState)('');
    const [formVisible, setFormVisible] = (0, react_1.useState)(false);
    //   console.log('all entries', description, date, specialist, diagnosisCodes, type);
    // Handlers for form inputs
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleDateChange = (event) => setDate(event.target.value);
    const handleSpecialistChange = (event) => setSpecialist(event.target.value);
    const handleTypeChange = (event) => setType(event.target.value);
    const handleDischargeChange = (event) => {
        const { name, value } = event.target;
        setDischarge((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleEmployerNameChange = (event) => setEmployerName(event.target.value);
    const handleSickLeaveChange = (event) => {
        const { name, value } = event.target;
        setSickLeave((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleHealthCheckRatingChange = (event) => setHealthCheckRating(event.target.value);
    const diagnoseOptions = (diagnoseData === null || diagnoseData === void 0 ? void 0 : diagnoseData.map(diagnosis => ({
        value: diagnosis.code,
        label: `${diagnosis.code} - ${diagnosis.name}`
    }))) || [];
    const handleNewEntry = (event) => {
        event.preventDefault();
        if (!description || !date || !specialist || !type) {
            // Throw a notification or return early
            setNotification("Please fill in all required fields");
            return;
        }
        if (type === "Hospital" && (!discharge.date || !discharge.criteria)) {
            setNotification("Please fill in all hospital-specific fields");
            return;
        }
        if (type === "OccupationalHealthcare" && (!employerName || !sickLeave.startDate || !sickLeave.endDate)) {
            setNotification("employer name or sick leave details missing");
            return;
        }
        if (type === "HealthCheck" && healthCheckRating === "") {
            setNotification("Please select a health check rating");
            return;
        }
        const baseEntry = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
        };
        let newEntry;
        switch (type) {
            case "Hospital":
                newEntry = Object.assign(Object.assign({}, baseEntry), { type: "Hospital", discharge: {
                        date: discharge.date,
                        criteria: discharge.criteria,
                    } });
                break;
            case "OccupationalHealthcare":
                newEntry = Object.assign(Object.assign({}, baseEntry), { type: "OccupationalHealthcare", employerName, sickLeave: sickLeave.startDate && sickLeave.endDate
                        ? { startDate: sickLeave.startDate, endDate: sickLeave.endDate }
                        : undefined });
                break;
            case "HealthCheck":
                newEntry = Object.assign(Object.assign({}, baseEntry), { type: "HealthCheck", healthCheckRating: Number(healthCheckRating) });
                break;
            default:
                throw new Error("Invalid entry type");
        }
        patients_1.default.addNewEntry(newEntry, patientId).then(patient => setPatient(patient));
        // const [description, setDescription] = useState('');
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setType('');
        setDischarge({ date: '', criteria: '' });
        setEmployerName('');
        setSickLeave({ startDate: '', endDate: '' });
        setHealthCheckRating('');
        setFormVisible(false);
        // Here you would typically send this newEntry to your backend or update your state
    };
    //showWhenVisible shows the button when login form is visible
    const showWhenVisible = { display: formVisible ? 'block' : 'none' };
    //hideWhenVisible hides the button when login form is visible 
    const hideWhenVisible = { display: formVisible ? 'none' : 'block' };
    return (<>
    <div className="new-entry-form" style={showWhenVisible}>
      <form onSubmit={handleNewEntry}>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="form-input" type="text" value={description} onChange={handleDescriptionChange}/>
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input className="form-input" type="date" value={date} onChange={handleDateChange}/>
        </div>
        <div className="form-group">
          <label className="form-label">Specialist</label>
          <input className="form-input" type="text" value={specialist} onChange={handleSpecialistChange}/>
        </div>
        <div className="form-group">
          <label className="form-label">Diagnosis Codes</label>
          <react_select_1.default isMulti options={diagnoseOptions} value={diagnosisCodes.map(code => {
            var _a;
            return ({
                value: code,
                label: ((_a = diagnoseData === null || diagnoseData === void 0 ? void 0 : diagnoseData.find(d => d.code === code)) === null || _a === void 0 ? void 0 : _a.name) || code
            });
        })} onChange={(selectedOptions) => {
            setDiagnosisCodes(selectedOptions.map(option => option.value));
        }} placeholder="Search and select diagnosis codes" className="react-select-container" classNamePrefix="react-select"/>
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={handleTypeChange}>
            <option value="" disabled>Select Type</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">OccupationalHealthcare</option>
            <option value="HealthCheck">HealthCheck</option>
          </select>
        </div>
  
        {type === 'Hospital' && (<div className="conditional-fields">
            <div className="form-group">
              <label className="form-label">Discharge Date</label>
              <input className="form-input" type="date" name="date" value={discharge.date} onChange={handleDischargeChange}/>
            </div>
            <div className="form-group">
              <label className="form-label">Criteria</label>
              <input className="form-input" type="text" name="criteria" value={discharge.criteria} onChange={handleDischargeChange}/>
            </div>
          </div>)}
  
        {type === 'OccupationalHealthcare' && (<div className="conditional-fields">
            <div className="form-group">
              <label className="form-label">Employer Name</label>
              <input className="form-input" type="text" value={employerName} onChange={handleEmployerNameChange}/>
            </div>
            <div className="form-group">
              <label className="form-label">Sick Leave Start Date</label>
              <input className="form-input" type="date" name="startDate" value={sickLeave.startDate} onChange={handleSickLeaveChange}/>
            </div>
            <div className="form-group">
              <label className="form-label">Sick Leave End Date</label>
              <input className="form-input" type="date" name="endDate" value={sickLeave.endDate} onChange={handleSickLeaveChange}/>
            </div>
          </div>)}
  
        {type === 'HealthCheck' && (<div className="conditional-fields">
            <div className="form-group">
              <label className="form-label">Health Check Rating</label>
              <select className="form-select" value={healthCheckRating} onChange={handleHealthCheckRatingChange}>
                <option value="" disabled>Select Rating</option>
                <option value="0">Healthy</option>
                <option value="1">LowRisk</option>
                <option value="2">HighRisk</option>
                <option value="3">CriticalRisk</option>
              </select>
            </div>
          </div>)}
  
        <button className="submit-button" type="submit">Create new entry</button>
        <button className='submit-button cancel-btn' onClick={() => setFormVisible(false)} type='button'>cancel</button>
      </form>
    </div>
    <button className='submit-button' style={hideWhenVisible} onClick={() => setFormVisible(true)}>Add New Entry</button>
    </>);
};
exports.default = NewEntryForm;

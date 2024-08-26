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
exports.addEntry = exports.addPatient = exports.getPatientById = exports.getPatients = void 0;
const toNewPatient_1 = require("../utils/toNewPatient");
const patient_1 = require("../models/patient");
const mongoose_1 = __importDefault(require("mongoose"));
const getPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield patient_1.PatientModel.find({}, { ssn: 0, entries: 0 });
    // console.log(patients);
    return patients;
});
exports.getPatients = getPatients;
const getPatientById = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_1.PatientModel.findById(patientId);
    if (patient) {
        return patient;
    }
    else {
        throw new Error('failed to get patient by id');
    }
});
exports.getPatientById = getPatientById;
const addPatient = (patient) => __awaiter(void 0, void 0, void 0, function* () {
    const newPatient = new patient_1.PatientModel(patient);
    const returnedPatient = yield newPatient.save();
    return returnedPatient;
});
exports.addPatient = addPatient;
const addEntry = (entry, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof entry === 'object') {
        const newEntry = (0, toNewPatient_1.parseEntry)(Object.assign(Object.assign({}, entry), { id: new mongoose_1.default.Types.ObjectId().toString() }));
        const updatedPatient = yield patient_1.PatientModel.findByIdAndUpdate(patientId, { $push: { entries: newEntry } }, { new: true, runValidators: true });
        if (updatedPatient) {
            return updatedPatient;
        }
        else {
            throw new Error('could not add patient entries');
        }
    }
    else {
        throw new Error('invalid entry');
    }
});
exports.addEntry = addEntry;

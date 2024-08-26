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
const axios_1 = __importDefault(require("axios"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`http://localhost:3001/api/patients`);
    return data;
});
const create = (object) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`http://localhost:3001/api/patients`, object);
    return data;
});
const getPatientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield axios_1.default.get(`http://localhost:3001/api/patients/${id}`).then(res => res.data);
        return patient;
    }
    catch (error) {
        throw new Error('cannot get patient from id');
    }
});
const addNewEntry = (entry, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPatient = yield axios_1.default.post(`http://localhost:3001/api/patients/entry/${patientId}`, entry).then(res => res.data);
        return updatedPatient;
    }
    catch (error) {
        throw new Error('cannot add new entry');
    }
});
exports.default = {
    getAll, create, getPatientById, addNewEntry
};

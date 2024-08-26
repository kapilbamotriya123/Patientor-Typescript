"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../../types");
const entrySchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    date: { type: String, required: true },
    specialist: { type: String, required: true },
    diagnosisCodes: [{ type: String }],
    type: { type: String, required: true },
    discharge: {
        date: String,
        criteria: String
    },
    employerName: String,
    sickLeave: {
        startDate: String,
        endDate: String
    },
    healthCheckRating: Number
}, { discriminatorKey: 'type' });
const patientSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    ssn: { type: String, required: true },
    gender: { type: String, enum: Object.values(types_1.Gender), required: true },
    occupation: { type: String, required: true },
    entries: [entrySchema]
});
patientSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id && typeof returnedObject._id === 'object') {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
        // Transform entries
        if (returnedObject.entries) {
            returnedObject.entries = returnedObject.entries.map((entry) => {
                if (entry._id && typeof entry._id === 'object') {
                    entry.id = entry._id.toString();
                }
                delete entry._id;
                delete entry.__v;
                return entry;
            });
        }
    }
});
exports.PatientModel = mongoose_1.default.model('Patient', patientSchema);

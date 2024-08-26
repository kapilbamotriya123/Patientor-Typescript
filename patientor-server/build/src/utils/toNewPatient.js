"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntry = exports.toNewPatient = void 0;
const types_1 = require("../../types");
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid or missing object: ' + object);
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object && Array.isArray(object.entries)) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries.map(entry => (0, exports.parseEntry)(entry))
        };
        return newPatient;
    }
    else {
        throw new Error('Missing fields in object');
    }
};
exports.toNewPatient = toNewPatient;
// Utility functions to validate types
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
// Parsing functions
const parseName = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid name: ' + param);
    }
    return param;
};
const parseDateOfBirth = (param) => {
    if (!param || !isString(param) || !isDate(param)) {
        throw new Error('Missing or invalid date of birth: ' + param);
    }
    return param;
};
const parseSsn = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid SSN: ' + param);
    }
    return param;
};
const parseGender = (param) => {
    if (!param || !isString(param) || !isGender(param)) {
        throw new Error('Missing or invalid gender: ' + param);
    }
    return param;
};
const parseOccupation = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid occupation: ' + param);
    }
    return param;
};
// Parse specific fields for entries
const parseDiagnosisCodes = (param) => {
    if (!Array.isArray(param) || !param.every(isString)) {
        throw new Error('Missing or invalid diagnosis codes: ' + param);
    }
    return param;
};
const parseDischarge = (param) => {
    if (!param ||
        typeof param !== 'object' ||
        !('date' in param) ||
        !('criteria' in param) ||
        !isString(param.date) ||
        !isString(param.criteria) ||
        !isDate(param.date)) {
        throw new Error('Invalid or missing discharge information: ' + JSON.stringify(param));
    }
    return {
        date: param.date,
        criteria: param.criteria,
    };
};
const parseSickLeave = (param) => {
    if (!param ||
        typeof param !== 'object' ||
        !('startDate' in param) ||
        !('endDate' in param) ||
        !isString(param.startDate) ||
        !isString(param.endDate) ||
        !isDate(param.startDate) ||
        !isDate(param.endDate)) {
        throw new Error('Invalid or missing sick leave information: ' + JSON.stringify(param));
    }
    return {
        startDate: param.startDate,
        endDate: param.endDate,
    };
};
const parseHealthCheckRating = (param) => {
    if (param === undefined || !isHealthCheckRating(param)) {
        throw new Error('Invalid or missing health check rating: ' + param);
    }
    return param;
};
// Entry parsing function
const parseEntry = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Invalid or missing entry object: ' + JSON.stringify(entry));
    }
    if (!('id' in entry) || !('description' in entry) || !('date' in entry) || !('specialist' in entry) || !('type' in entry)) {
        throw new Error('Missing required entry fields: ' + JSON.stringify(entry));
    }
    const baseEntry = {
        id: parseName(entry.id), // Assuming id is a string
        description: parseName(entry.description),
        date: parseDateOfBirth(entry.date),
        specialist: parseName(entry.specialist),
        diagnosisCodes: 'diagnosisCodes' in entry && Array.isArray(entry.diagnosisCodes)
            ? parseDiagnosisCodes(entry.diagnosisCodes)
            : undefined
    };
    switch (entry.type) {
        case "Hospital":
            if (!('discharge' in entry)) {
                throw new Error('Missing discharge for Hospital entry: ' + JSON.stringify(entry));
            }
            return Object.assign(Object.assign({}, baseEntry), { discharge: parseDischarge(entry.discharge), type: "Hospital" });
        case "OccupationalHealthcare":
            if (!('employerName' in entry)) {
                throw new Error('Missing employerName for OccupationalHealthcare entry: ' + JSON.stringify(entry));
            }
            return Object.assign(Object.assign({}, baseEntry), { employerName: parseName(entry.employerName), sickLeave: 'sickLeave' in entry ? parseSickLeave(entry.sickLeave) : undefined, type: "OccupationalHealthcare" });
        case "HealthCheck":
            if (!('healthCheckRating' in entry)) {
                throw new Error('Missing healthCheckRating for HealthCheck entry: ' + JSON.stringify(entry));
            }
            return Object.assign(Object.assign({}, baseEntry), { healthCheckRating: parseHealthCheckRating(entry.healthCheckRating), type: "HealthCheck" });
        default:
            throw new Error('Invalid or missing entry type: ' + JSON.stringify(entry));
    }
};
exports.parseEntry = parseEntry;

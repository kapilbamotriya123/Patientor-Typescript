import { NewPatient, Gender, Entry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";



export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid or missing object: ' + object);
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object && Array.isArray(object.entries)) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries.map(entry => parseEntry(entry))
        };


        return newPatient;
    } else {
        throw new Error('Missing fields in object');
    }
};

// Utility functions to validate types
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

// Parsing functions
const parseName = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid name: ' + param);
    }
    return param;
};

const parseDateOfBirth = (param: unknown): string => {
    if (!param || !isString(param) || !isDate(param)) {
        throw new Error('Missing or invalid date of birth: ' + param);
    }
    return param;
};

const parseSsn = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid SSN: ' + param);
    }
    return param;
};

const parseGender = (param: unknown): Gender => {
    if (!param || !isString(param) || !isGender(param)) {
        throw new Error('Missing or invalid gender: ' + param);
    }
    return param;
};

const parseOccupation = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error('Missing or invalid occupation: ' + param);
    }
    return param;
};

// Parse specific fields for entries
const parseDiagnosisCodes = (param: unknown): Array<string> => {
    if (!Array.isArray(param) || !param.every(isString)) {
        throw new Error('Missing or invalid diagnosis codes: ' + param);
    }
    return param;
};

const parseDischarge = (param: unknown): HospitalEntry['discharge'] => {
    if (
        !param ||
        typeof param !== 'object' ||
        !('date' in param) ||
        !('criteria' in param) ||
        !isString((param as { date: unknown }).date) ||
        !isString((param as { criteria: unknown }).criteria) ||
        !isDate((param as { date: string }).date)
    ) {
        throw new Error('Invalid or missing discharge information: ' + JSON.stringify(param));
    }

    return {
        date: (param as { date: string }).date,
        criteria: (param as { criteria: string }).criteria,
    };
};


const parseSickLeave = (param: unknown): OccupationalHealthcareEntry['sickLeave'] => {
    if (
        !param ||
        typeof param !== 'object' ||
        !('startDate' in param) ||
        !('endDate' in param) ||
        !isString((param as { startDate: unknown }).startDate) ||
        !isString((param as { endDate: unknown }).endDate) ||
        !isDate((param as { startDate: string }).startDate) ||
        !isDate((param as { endDate: string }).endDate)
    ) {
        throw new Error('Invalid or missing sick leave information: ' + JSON.stringify(param));
    }

    return {
        startDate: (param as { startDate: string }).startDate,
        endDate: (param as { endDate: string }).endDate,
    };
};


const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
    if (param === undefined || !isHealthCheckRating(param as number)) {
        throw new Error('Invalid or missing health check rating: ' + param);
    }
    return param as HealthCheckRating;
};

// Entry parsing function
export const parseEntry = (entry: unknown): Entry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Invalid or missing entry object: ' + JSON.stringify(entry));
    }

    if (!('id' in entry) || !('description' in entry) || !('date' in entry) || !('specialist' in entry) || !('type' in entry)) {
        throw new Error('Missing required entry fields: ' + JSON.stringify(entry));
    }

    const baseEntry = {
        id: parseName((entry as { id: unknown }).id), // Assuming id is a string
        description: parseName((entry as { description: unknown }).description),
        date: parseDateOfBirth((entry as { date: unknown }).date),
        specialist: parseName((entry as { specialist: unknown }).specialist),
        diagnosisCodes: 'diagnosisCodes' in entry && Array.isArray((entry as { diagnosisCodes: unknown }).diagnosisCodes) 
            ? parseDiagnosisCodes((entry as { diagnosisCodes: unknown }).diagnosisCodes) 
            : undefined
    };

    switch ((entry as { type: unknown }).type) {
        case "Hospital":
            if (!('discharge' in entry)) {
                throw new Error('Missing discharge for Hospital entry: ' + JSON.stringify(entry));
            }
            return {
                ...baseEntry,
                discharge: parseDischarge((entry as { discharge: unknown }).discharge),
                type: "Hospital"
            } as HospitalEntry;

        case "OccupationalHealthcare":
            if (!('employerName' in entry)) {
                throw new Error('Missing employerName for OccupationalHealthcare entry: ' + JSON.stringify(entry));
            }
            return {
                ...baseEntry,
                employerName: parseName((entry as { employerName: unknown }).employerName),
                sickLeave: 'sickLeave' in entry ? parseSickLeave((entry as { sickLeave: unknown }).sickLeave) : undefined,
                type: "OccupationalHealthcare"
            } as OccupationalHealthcareEntry;

        case "HealthCheck":
            if (!('healthCheckRating' in entry)) {
                throw new Error('Missing healthCheckRating for HealthCheck entry: ' + JSON.stringify(entry));
            }
            return {
                ...baseEntry,
                healthCheckRating: parseHealthCheckRating((entry as { healthCheckRating: unknown }).healthCheckRating),
                type: "HealthCheck"
            } as HealthCheckEntry;

        default:
            throw new Error('Invalid or missing entry type: ' + JSON.stringify(entry));
    }
};


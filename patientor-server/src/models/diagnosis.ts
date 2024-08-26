import mongoose from "mongoose";
import { DiagnoseEntry } from "../../types";

const diagnoseSchema = new mongoose.Schema<DiagnoseEntry>({
    code: {type: String, required: true, unique: true},
    name : { type: String, required: true},
    latin : { type: String}
});

diagnoseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if ( returnedObject._id &&  typeof returnedObject._id === 'string' ) 
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const DiagnoseModel = mongoose.model<DiagnoseEntry>('Diagnose', diagnoseSchema);
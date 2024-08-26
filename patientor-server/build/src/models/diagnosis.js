"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnoseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const diagnoseSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    latin: { type: String }
});
diagnoseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id && typeof returnedObject._id === 'string')
            returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.DiagnoseModel = mongoose_1.default.model('Diagnose', diagnoseSchema);

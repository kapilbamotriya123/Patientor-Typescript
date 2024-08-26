import { DiagnoseEntry } from '../../types';
import { DiagnoseModel } from '../models/diagnosis';

export const getDiagnoseEntries = async(): Promise<DiagnoseEntry[]>  => {
    const diagnoseData = await DiagnoseModel.find({});
    return diagnoseData;
    
};


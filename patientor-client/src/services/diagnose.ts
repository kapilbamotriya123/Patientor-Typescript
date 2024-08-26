import axios from "axios";
// import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";


const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';


const getAllDiagnoses = async() => {
    try{
        console.log(baseUrl);
        const data = await axios.get<Diagnosis []>(`${baseUrl}/diagnoses`).then(res => res.data);
        return data;
    } catch(error) {
        throw new Error('couldn\'t fetch diagnoses');
    } 
};

export default {getAllDiagnoses};
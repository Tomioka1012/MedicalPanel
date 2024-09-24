// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);
  return response.data;
};

export const getDoctor = async (doctor:number) => {
    const response = await axios.get(`${API_URL}/doctors/${doctor}`);
    return response.data;
  };

export const addPatient = async (patient: any) => {
  const response = await axios.post(`${API_URL}/patients`, patient);
  return response.data;
};

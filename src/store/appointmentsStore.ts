import axios from 'axios';
import {create} from 'zustand'
import { devtools } from 'zustand/middleware'
import { Appointment, Doctor } from '../types/types'

//type of doctor state
type DoctorState = {
  doctor: Doctor | null
  appointments : Appointment[]
  loading: boolean
  error: string | null
  fetchDoctor: (id: number) => Promise<void>
  updateDoctor: (id: number, updatedData: Partial<Doctor>) => Promise<void>
  fetchAppointments :(id:number)=> void
}
//functions

 
export const useDoctorStore = create <DoctorState>()(devtools((set, )=>({
  doctor: null,
  appointments : [],
  loading: false,
  error: null,

  fetchDoctor: async (id: number) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`http://localhost:3000/doctors/${id}`)
      set({ doctor: response.data, loading: false })
    } catch (error) {
      set({ error: "hubo un error", loading: false })
    }
  },

  updateDoctor: async (id: number, updatedData: Partial<Doctor>) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.put(`http://localhost:3000/doctors/${id}`, updatedData)
      set({ doctor: response.data, loading: false })
    } catch (error) {
      set({ error: "hubo un error", loading: false })
    }
  },

  fetchAppointments: async (id: number) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`http://localhost:3000/patients?doctorId=${id}`)
      set({ doctor: response.data, loading: false })
    } catch (error) {
      set({ error: "hubo un error", loading: false })
    }
  }
    

})))
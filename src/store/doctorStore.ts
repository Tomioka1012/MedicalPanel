import axios from 'axios';
import {create} from 'zustand'
import { devtools } from 'zustand/middleware'
import { Appointment, Doctor, Patient, PreAppointment, PrePatient } from '../types/types'
import { generateThreeDigitId } from '../helpers/search';


//type of doctor state
type DoctorState = {
  doctor: Doctor | null
  doctors: Doctor[]
  appointments : Appointment[]
  patients: Patient[]
  loading: boolean
  error: string | null
  currentPatient: Patient | null
  currentAppointment: Appointment | null
  fetchDoctor: (id: number) => Promise<void>
  fetchDoctors: () => Promise<void>
  updateDoctor: (id: number, updatedData: Partial<Doctor>) => Promise<void>
  fetchAppointments: (id:number)=> void
  fetchpatients: (id:number)=> void
  getpatientById:(id:number)=>void
  deletePatient:(id:number)=>void
  editPatient:(patientData:Patient)=>void
  resetCurrentPatient: ()=>void
  getAppointmentById:(id:number) => void
  deleteAppointment:(id:number)=>void
  editAppointment:(appointmentData:Appointment)=>void
  getInfoPatient: (id: number) => Promise<Patient | null>
  createAppointment: (appoint: PreAppointment) =>void
  createPatient: (data: PrePatient) => void
  editDoctor: (doctorData:Doctor)=>void
}
//functions

 
export const useDoctorStore = create <DoctorState>()(devtools((set,get )=>({
  doctor: null,
  doctors:[],
  appointments : [],
  patients: [],
  loading: false,
  error: null,
  currentPatient: null,
  currentAppointment:null,

  fetchDoctor: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
      //access to doctors
      const doctorsResponse: Doctor[] = response.data.data.doctors; 
      //find the specific doctor
      const doctor = doctorsResponse.find(doc => doc.id === id);
      //console.log(doctor);
      if (doctor) {
          set({ doctor: doctor, loading: false })
      } else {
          set({ error: 'User not found', loading: false });
      }
  } catch (error) {
    set({ error: "hubo un error", loading: false });
  }
  },
  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
      const doctorsResponse: Doctor[] = response.data.data.doctors; 
      set({ doctors: doctorsResponse, loading: false });
  } catch (error) {
    set({ error: "hubo un error", loading: false });
  }
  },

  updateDoctor: async (id: number, updatedData: Partial<Doctor>) => {
    try {
      
      const response = await axios.put(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395/doctors/${id}`, updatedData);
      set((state) => ({
        doctors: state.doctors.map((doctor) =>
          doctor.id === id ? { ...doctor, ...updatedData } : doctor
        ),
        doctor: response.data, 
        loading: false,
      }));
  
      console.log('Doctor actualizado con éxito:', response.data);
    } catch (error: any) {
      console.log('Error al actualizar el doctor:', error.message);
      set({ error: "hubo un error", loading: false });
    }
  },

  fetchAppointments: async (id: number) => {
    set({ loading: true, error: null });
      try {
        const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
        const allAppointments = response.data.data.appointments;
        const doctorAppointments = allAppointments.filter((appointment: any) => appointment.doctorId === id);
        set({ appointments: doctorAppointments, loading: false });
      } catch (error) {
        set({ error: "hubo un error", loading: false });
      }
  },

   fetchpatients: async (id: number) => {
    try {
      const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
      const allPatients = response.data.data.patients;
      const doctorPatients = allPatients.filter((patient: any) => patient.doctorId === id);
      set({ patients: doctorPatients, loading: false });
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  getpatientById: async (id:number) =>{
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
      const allPatients = response.data.data.patients;
      const currentPatient = allPatients.find((patient: any) => patient.id === id);
      set({ currentPatient, loading: false });
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  deletePatient: (id:number) =>{
    try {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
        currentPatient: state.currentPatient?.id === id ? null : state.currentPatient,
      }));
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  editPatient: (patientData:Patient) =>{
    try {
      set((state) => ({
        patients: state.patients.map((patient) =>
          patientData.id === patient.id ? { ...patient, ...patientData } : patient
        ),
        currentPatient: state.currentPatient?.id === patientData.id ? { ...state.currentPatient, ...patientData } : state.currentPatient,
      }));
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  resetCurrentPatient: () =>{
    set({currentPatient:null})
  },
  getAppointmentById: async (id:number) =>{
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
      const allAppointments = response.data.data.appointments;
      const appointment = allAppointments.find((appointment: any) => appointment.id === id);
      set({ currentAppointment: appointment, loading: false });
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  deleteAppointment: (id:number) =>{
    try {
      set(state =>({
        appointments: state.appointments.filter(appointment => appointment.id !== id),
        currentAppointment: null
      }))
    } catch (error) {
      set({ error: "hubo un error", loading: false })
    }
  },
  editAppointment: (appointmentData: Appointment) => {
    try {
      set((state) => ({
        appointments: state.appointments.map((appointment) => appointmentData.id == appointment.id ? {...appointmentData} : appointment),
        currentAppointment: null,
      }));
    } catch (error) {
      set({ error: "hubo un error", loading: false });
    }
  },
  getInfoPatient: async (id: number) => {
  set({ loading: true, error: null }); 
  try {
    const { doctor } = get();
    
    if (!doctor) {
      throw new Error("Doctor not found"); 
    }
    const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
    const allPatients = response.data.data.patients;

    const patient = allPatients.find((p: any) => p.id == id);
    
    if (!patient) {
      throw new Error("Patient not found"); 
    }

    if (patient.doctorId == doctor.id) {
      console.log(patient);
      set({ loading: false });
      return patient; 
    } else {
      console.log('el paciente no coincide')
      set({ loading: false });
      return null; 
    }
  } catch (error) {
    set({ error: "hubo un error", loading: false });
    return null; 
  }
},
createAppointment: async (appoint) => {
  try {
    let idAppoint: number | null = null;
    let idExists = true;

    
    while (idExists) {
      idAppoint = generateThreeDigitId();

      try {
        const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
        const appointments = response.data.data.appointments;

        idExists = appointments.some((appointment: Appointment) => appointment.id === idAppoint);

        if (idExists) {
          console.log(`El id ${idAppoint} ya existe, generando uno nuevo...`);
        }

      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          idExists = false;
        } else {
          console.log('Ocurrió un error al verificar el id de la cita:', error.message);
          throw error;
        }
      }
    }

    const newAppointment: Appointment = { ...appoint, id: idAppoint || 0 };

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }));

    console.log('Cita creada con éxito:', newAppointment);
  } catch (error: any) {
    console.log('Ocurrió un error al crear la cita:', error.message);
  }
},
createPatient: async (data) => {
  try {
    let idPatient: number | null = null;
    let idExists = true;

    while (idExists) {
      idPatient = generateThreeDigitId();

      try {
        const response = await axios.get(`https://api.myjson.online/v1/records/99c73509-3aef-4d97-9242-37017fea5395`);
        const patients = response.data.data.patients;

        idExists = patients.some((patient: Patient) => patient.id === idPatient);

        if (idExists) {
          console.log(`El id ${idPatient} ya existe, generando uno nuevo...`);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          idExists = false;
        } else {
          console.log('Ocurrió un error al verificar el id del paciente:', error.message);
          throw error;
        }
      }
    }

    const newPatient: Patient = { ...data, id: idPatient || 0 };

    set((state) => ({
      patients: [...state.patients, newPatient],
    }));

    console.log('Paciente creado con éxito:', newPatient);
  } catch (error: any) {
    console.log('Ocurrió un error al crear al paciente:', error.message);
  }
},
editDoctor: async (doctorData:Doctor) =>{
  try {
    set((state) => ({
      doctors: state.doctors.map((doctor) => doctor.id == doctorData.id ? {...doctorData} : doctor),
      doctor: doctorData
    }));
  } catch (error) {
    set({ error: "hubo un error", loading: false })
  }
}

})))
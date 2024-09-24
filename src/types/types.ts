//type of doctor
export type Doctor = {
    id: number,
    name: string,
    phone: number | string,
    email: string,
    medicalSpeciality: string,
    officeAddress: string,
    profilePicture: string
}

//type of patient 
export type Patient = {
    id: number,
    name: string,
    phone: number | string,
    email: string,
    doctorId: number
}

export type PrePatient = {
    name: string,
    phone: number | string,
    email: string,
    doctorId: number
}

export type Appointment = {
    id: number;
    patientId: number;
    doctorId: number;
    patient: string;
    date: string | Date;  // Cambiado de Date a string
    reason: string;
}
export type PreAppointment = {
    patientId: number;
    doctorId: number;
    patient: string;
    date: string | Date;  // Cambiado de Date a string
    reason: string;
}


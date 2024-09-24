import { Appointment } from "../types/types"
import { useDoctorStore } from "../store/doctorStore";
//import { getDate } from "../helpers/search";
import { toast } from 'react-toastify';


type AppointmentsRowProps={
  appointment: Appointment
  setModalAppointment: React.Dispatch<React.SetStateAction<boolean>>
}
const AppointmentsRow = ({appointment,setModalAppointment}:AppointmentsRowProps) => {
  const {getAppointmentById,deleteAppointment} = useDoctorStore();
  const handleEdit = (id:number) => {
    getAppointmentById(id);
    setTimeout(() => {
      setModalAppointment(true);
    }, 500);
    
  }
  const handleDelete = () =>{
    const result = confirm("Are you sure you want to delete this patient?");
    if(result){
        deleteAppointment(appointment.id);
        toast.success("Appointment removed correctly");
    }
  }
  return (
    <>
        <tr className="border-b">
            <td className="p-2">{appointment.patient}</td>
            <td className="p-2">{appointment.patientId}</td>
            <td className="p-2">{(appointment.date).toString()}</td>
            <td className="p-2">{appointment.reason}</td>
            <td className="p-2">
                <button className="py-2 px-3 bg-slate-100 rounded hover:bg-slate-200 text-slate-600"
                onClick={()=>handleEdit(appointment.id)}
                ><i className="fa-regular fa-pen-to-square"></i> edit</button>
                <button className="p-2 ms-2 bg-red-700 rounded text-white hover:bg-red-800"
                onClick={()=>handleDelete()}
                ><i className="fa-solid fa-trash"></i> Delete</button>
            </td>
        </tr>
        
    </>
  )
}

export default AppointmentsRow
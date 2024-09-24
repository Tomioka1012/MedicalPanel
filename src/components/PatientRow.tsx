import { Patient } from "../types/types"
import { useDoctorStore } from "../store/doctorStore";
import { toast } from 'react-toastify';

//type of patientRow
type patientRowProps = {
  patient: Patient
  setModalPatient: React.Dispatch<React.SetStateAction<boolean>>
}

const PatientRow = ({patient,setModalPatient}:patientRowProps) => {

  const {getpatientById,deletePatient} = useDoctorStore();

  const handleEdit = () => {
    getpatientById(patient.id);
    setTimeout(() => {
      setModalPatient(true);
    }, 500);
    
  }
  const handleDelete = () =>{
    const result = confirm("Are you sure you want to delete this patient?");
    if(result){
        deletePatient(patient.id);
        toast.success("patient removed correctly");
    }
  }
  return (
    <>
        <tr className="border-b ">
            <td className="p-2">{patient.name}</td>
            <td className="p-2">{patient.id}</td>
            <td className="p-2">{patient.phone}</td>
            <td className="p-2">{patient.email}</td>
            <td className="p-2">
                <button className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 font-medium">download </button>
            </td>
            <td className="p-2 text-center">
                <button className="py-2 px-3 bg-slate-100 rounded hover:bg-slate-200 text-slate-600"
                onClick={handleEdit}
                ><i className="fa-regular fa-pen-to-square"></i> edit</button>
                <button className="p-2 ms-2 bg-red-700 rounded text-white hover:bg-red-800"
                onClick={handleDelete}
                ><i className="fa-solid fa-trash"></i> Delete</button>
            </td>
        </tr>
    </>
  )
}

export default PatientRow
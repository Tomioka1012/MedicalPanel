import { useState } from "react"
import { useDoctorStore } from "../store/doctorStore"
import { toast } from 'react-toastify';

//props de editAppointment
type EditAppointmentProps = {
    setModalAppointment: React.Dispatch<React.SetStateAction<boolean>>

}
const EditAppointment = ({setModalAppointment}:EditAppointmentProps) => {
    //zustand
    const{currentAppointment, editAppointment}= useDoctorStore();
    //usestates
    //useStore for data
    const [formValues, setFormValues] = useState({
        id: currentAppointment?.id || 0,
        patientId: currentAppointment?.patientId || 0,
        doctorId: currentAppointment?.doctorId || 0,
        patient: currentAppointment?.patient || '',
        date: currentAppointment?.date || new Date().toISOString().split('T')[0],
        reason: currentAppointment?.reason || ''
    });
    //usestate for error Messages
    const[errorMessage, setErrorMessage] = useState({
        status: false,
        message:''
    });

    //Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value, // La fecha se mantiene como string 'YYYY-MM-DD'
        }));
    };

    //Handle submit
    //Verify data before sent it
    const handleSubmit = () => {
        if(formValues.patient === '' || formValues.reason ===''){
            setErrorMessage({status:true, message:'All fields are required'});
            setTimeout(() => {
              setErrorMessage({status:false, message:''});
            }, 3000);
            return;
        }
    
        // Convertir el string 'YYYY-MM-DD' a un objeto Date
        const formattedValues = {
            ...formValues // Convertir el string a Date
        };
    
        editAppointment(formattedValues);
    
        setModalAppointment(false);
        toast.success("patient edited correctly");
    }
    //Handle close
    const handleClose = () =>{
        setModalAppointment(false);
    }
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
        
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col ">
                                <div className="w-full text-center font-medium text-xl mb-3">Edit Appointment Details</div>
                                { errorMessage.status == true && <div className="text-center text-white bg-red-500">{errorMessage.message}</div>}
                                <div className="flex mt-5">
                                    <div className=" mb-2 flex flex-col w-2/3 pe-2 ">
                                    <label htmlFor="patient" className="font-medium">patient Name</label>
                                    <input type="text" name="patient" id="patient" placeholder="" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                    value={formValues.patient}
                                    onChange={handleInputChange}
                                     />
                                    </div>
                                    <div className=" mb-2 flex flex-col w-1/3 ">
                                    <label htmlFor="patientId" className="font-medium">Patient ID</label>
                                    <input type="text" name="patientId" id="patientId" placeholder={currentAppointment?.patientId.toString() || ''} className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2"  disabled />
                                    </div>
                                </div>
                                <div className=" mb-2 flex flex-col w-full">
                                    <label htmlFor="date" className="font-medium">Date</label>
                                    <input 
                                        type="date" 
                                        name="date" 
                                        id="date" 
                                        className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                        value={new Date(formValues.date).toISOString().split('T')[0]}  // Aquí siempre debería ser 'YYYY-MM-DD'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className=" mb-2 flex flex-col w-full">
                                    <label htmlFor="reason" className="font-medium">Reason</label>
                                    <input type="text" name="reason" id="reason" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                    value={formValues.reason}
                                    onChange={handleInputChange}
                                     />
                                </div>
                            </div>
                        </div>
                        <div className=" px-4 py-3  sm:px-6 flex justify-end">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-white border px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-red-500 hover:text-white sm:ml-3 sm:w-auto"
                            onClick={handleClose}
                            >cancel</button>
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-slate-600 text-white border px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-700 sm:ml-3 sm:w-auto"
                            onClick={handleSubmit}
                            >save changes</button>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>
  )
}

export default EditAppointment
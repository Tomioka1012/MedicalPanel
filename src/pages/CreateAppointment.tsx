import { useState } from "react";
import { toast } from 'react-toastify';
import { useDoctorStore } from "../store/doctorStore";

type CreateAppointmentProps = {
    setModalCreateAppointment: React.Dispatch<React.SetStateAction<boolean>>

}
const CreateAppointment = ({setModalCreateAppointment}:CreateAppointmentProps) => {

    const{getInfoPatient, createAppointment}= useDoctorStore();

    //state
    const [formValues, setFormValues] = useState({
        patientId: 0,
        date: new Date().toISOString().split('T')[0],
        reason:  ''
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
    //Handle close
    const handleClose = () =>{
        setModalCreateAppointment(false);
    }
    //handle submit
    const  handleSubmit = async()  => {
        const patientExist = await getInfoPatient(formValues.patientId);

        if(formValues.patientId.toString() === '' || formValues.reason ===''){
            setErrorMessage({status:true, message:'All fields are required'});
            setTimeout(() => {
              setErrorMessage({status:false, message:''});
            }, 3000);
            return;
        }else{
            if(!patientExist){
                setErrorMessage({status:true, message:'The patient does not exist, Register the patient to schedule an appointment'});
                console.log(patientExist)
                setTimeout(() => {
                setErrorMessage({status:false, message:''});
                }, 3000);
                return;
            }else{
                const newAppointment = {
                    patientId: formValues.patientId,
                    doctorId: patientExist.doctorId,
                    patient: patientExist.name,
                    date: formValues.date,
                    reason: formValues.reason
                }
                createAppointment(newAppointment);
            }
        }
        
        setModalCreateAppointment(false);
        toast.success("appointment created correctly");
    }
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
        
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col ">
                                <div className="w-full text-center font-medium text-xl mb-3">Create an appointment</div>
                                { errorMessage.status == true && <div className="text-center text-white bg-red-500">{errorMessage.message}</div>}
                                <div className="flex mt-5">
                                    <div className=" mb-2 flex flex-col w-full pe-2 ">
                                        <label htmlFor="patientId" className="font-medium">patient ID</label>
                                        <input type="number" name="patientId" id="patientId" placeholder="" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                        value={formValues.patientId}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className=" mb-2 flex flex-col w-full">
                                    <label htmlFor="date" className="font-medium">Date</label>
                                    <input 
                                        type="date" 
                                        name="date" 
                                        id="date" 
                                        className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                        value={formValues.date}
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
                            >create</button>
                        </div>
                    </form>
                
            </div>
        </div>
    </div>
  )
}

export default CreateAppointment
import { useState } from "react"
import { useDoctorStore } from "../store/doctorStore"
import { toast } from "react-toastify"
//Type props
type editPatientsProps = {
    setModalPatient: React.Dispatch<React.SetStateAction<boolean>>
  }
const EditPatients = ({setModalPatient}:editPatientsProps) => {
  //Zustant 
  const {currentPatient, editPatient,resetCurrentPatient} = useDoctorStore();
  //useState
  //useStore for data
  const [formValues, setFormValues] = useState({
        id: currentPatient?.id || 0,
        name: currentPatient?.name || '',
        email: currentPatient?.email || '',
        phone: currentPatient?.phone || 0,
        doctorId: currentPatient?.doctorId || 0
    });
  //UseStore for error message
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: ''
  });  
    //handle onchage inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    //Verify data before sent it
    const handleSubmit =() =>{
      //Verify if every input is NOT empty
      if(formValues.email === '' || formValues.name ===''|| formValues.phone.toString() === ''){
          setErrorMessage({status:true, message:'All fields are required'});
          setTimeout(() => {
            setErrorMessage({status:false, message:''});
          }, 3000);
          return;
      }
      //Verify if the email is correct
      const emailregrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailregrex.test(formValues.email)){
        setErrorMessage({status:true, message:'email is not correct'});
        setTimeout(() => {
          setErrorMessage({status:false, message:''});
        }, 3000);
      }else{
        editPatient(formValues);
        setModalPatient(false);
        toast.success("patient edited correctly");

      }
    }
    //handle close Modal
    const handleClose = () => {
      //set CurrentPatient null
      resetCurrentPatient();
      setModalPatient(false);
    }
  return (
  <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
  
      <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="flex flex-col ">
            <div className="w-full text-center font-medium text-xl mb-3">Edit Patient Details</div>
            { errorMessage.status == true && <div className="text-center text-white bg-red-500">{errorMessage.message}</div>}
            <div className="flex mt-5">
              <div className=" mb-2 flex flex-col w-2/3 pe-2 ">
                <label htmlFor="name" className="font-medium">Name</label>
                <input type="text" name="name" id="name" placeholder="" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                value={formValues.name} 
                onChange={handleInputChange} />
              </div>
              <div className=" mb-2 flex flex-col w-1/3 ">
                <label htmlFor="name" className="font-medium">ID</label>
                <input type="text" name="" id="name" placeholder={formValues.id.toString() || ''} className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2"  disabled />
              </div>
            </div>
            <div className=" mb-2 flex flex-col w-full">
                <label htmlFor="email" className="font-medium">Email</label>
                <input type="email" name="email" id="email" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                value={formValues.email} 
                onChange={handleInputChange} />
            </div>
            <div className=" mb-2 flex flex-col w-full">
                <label htmlFor="phone" className="font-medium">Phone</label>
                <input type="phone" name="phone" id="phone" className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                value={formValues.phone} 
                onChange={handleInputChange} />
            </div>
            <div className=" mb-2 flex flex-col w-full">
                <label htmlFor="email" className="font-medium mb-2">Medical History</label>
                <input type="file" name="" id="" className="border-0" disabled />
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

export default EditPatients
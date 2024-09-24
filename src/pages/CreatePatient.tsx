import { useState } from "react";
import { useDoctorStore } from "../store/doctorStore";
import { toast } from 'react-toastify';

type CreatePatientProps = {
    setModalCreatePatient: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePatient = ({ setModalCreatePatient }: CreatePatientProps) => {

    const{createPatient,doctor}= useDoctorStore();
    // state
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        email: '',
    });
    //usestate for error Messages
    const[errorMessage, setErrorMessage] = useState({
        status: false,
        message:''
    });

    const handleSubmit = () => {
        if(formValues.name === '' || formValues.email ==='' || formValues.phone === ''){
            setErrorMessage({status:true, message:'All fields are required'});
            setTimeout(() => {
              setErrorMessage({status:false, message:''});
            }, 3000);
            return;
        }else{

            //Verify if the email is correct
            const emailregrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailregrex.test(formValues.email)){
                setErrorMessage({status:true, message:'email is not correct'});
                setTimeout(() => {
                setErrorMessage({status:false, message:''});
                }, 3000);
            }else{
                const newPatient = {...formValues, doctorId: doctor?.id || 0}
                createPatient(newPatient);
                setModalCreatePatient(false);
                toast.success("Patient created correctly");
            }
        }
    };

    const handleClose = () => {
        setModalCreatePatient(false);
    };

    // Función para formatear el número de teléfono
    const formatPhoneNumber = (value: string) => {
        const cleanedValue = value.replace(/\D/g, "");
        const limitedValue = cleanedValue.slice(0, 7);

        if (limitedValue.length > 3) {
            return `${limitedValue.slice(0, 3)}-${limitedValue.slice(3)}`;
        }
        return limitedValue;
    };

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Formatear el número si el campo es "phone"
        if (name === "phone") {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: formatPhoneNumber(value),
            }));
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col">
                                <div className="w-full text-center font-medium text-xl mb-3">Create a new patient</div>
                                { errorMessage.status == true && <div className="text-center text-white bg-red-500">{errorMessage.message}</div>}
                                <div className="flex mt-5">
                                    <div className="mb-2 flex flex-col w-full pe-2">
                                        <label htmlFor="name" className="font-medium">patient name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder=""
                                            className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex mt-5">
                                    <div className="mb-2 flex flex-col w-full pe-2">
                                        <label htmlFor="phone" className="font-medium">Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="555-0001"
                                            className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 flex flex-col w-full">
                                    <label htmlFor="email" className="font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="border rounded h-9 focus:outline-none focus:border-slate-400 p-2"
                                        placeholder="email@example.com"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-2 flex flex-col w-full">
                                    <label htmlFor="file" className="font-medium">Medical History</label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="h-9 focus:outline-none focus:border-slate-400 p-2"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:px-6 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-white border px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-red-500 hover:text-white sm:ml-3 sm:w-auto"
                                onClick={handleClose}
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-slate-600 text-white border px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-700 sm:ml-3 sm:w-auto"
                                onClick={handleSubmit}
                            >
                                create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePatient;
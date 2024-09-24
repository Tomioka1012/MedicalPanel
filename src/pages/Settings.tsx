import { useDoctorStore } from "../store/doctorStore"
import { useState, useEffect } from "react";

const Settings = () => {
    const {doctor,editDoctor} = useDoctorStore();
    const [formValues, setFormValues] = useState({
        id: doctor?.id || 0,
        name: doctor?.name || '',
        phone: doctor?.phone.toString() || '',
        email: doctor?.email || '',
        medicalSpeciality: doctor?.medicalSpeciality || '',
        officeAddress: doctor?.officeAddress || '',
        profilePicture: doctor?.profilePicture || ''
    });
    //usestate for error Messages
    const[errorMessage, setErrorMessage] = useState({
        status: false,
        message:''
    });

    useEffect(() => {
        setFormValues({
            id: doctor?.id || 0,
            name: doctor?.name || '',
            phone: doctor?.phone.toString() || '',
            email: doctor?.email || '',
            medicalSpeciality: doctor?.medicalSpeciality || '',
            officeAddress: doctor?.officeAddress || '',
            profilePicture: doctor?.profilePicture || ''
        });
    }, [doctor]);

    // Función para formatear el número de teléfono
    const formatPhoneNumber = (value: string) => {
        const cleanedValue = value.replace(/\D/g, "");
        const limitedValue = cleanedValue.slice(0, 7);

        if (limitedValue.length > 3) {
            return `${limitedValue.slice(0, 3)}-${limitedValue.slice(3)}`;
        }
        return limitedValue;
    };

    //
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

    const handleEdit = () =>{
        //become all inputs editables
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(input =>{
            (input as HTMLInputElement).disabled = false;
        });
        //become "btn changePhoto" visible
        document.getElementById('btn-changePhoto')?.classList.remove('hidden');
        document.getElementById('btn-changePhoto')?.classList.add('block');
        //hide "edit information button"
        document.getElementById('btn-edit')?.classList.remove('inline-flex');
        document.getElementById('btn-edit')?.classList.add('hidden');
        //became "btn submit" visible
        document.getElementById('btn-submit')?.classList.remove('hidden');
        document.getElementById('btn-submit')?.classList.add('inline-flex');

    }

    const handleSubmit = () =>{
        if(formValues.name === '' || formValues.email ==='' || formValues.phone?.toString() == '' || formValues.medicalSpeciality == '' || formValues.officeAddress == ''){
            setErrorMessage({status:true, message:'All fields are required'});
            setTimeout(() => {
              setErrorMessage({status:false, message:''});
            }, 3000);
            return;
        }else{

            //Verify if the email is correct
            const emailregrex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailregrex.test(formValues.email || '')){
                setErrorMessage({status:true, message:'email is not correct'});
                setTimeout(() => {
                setErrorMessage({status:false, message:''});
                }, 3000);
            }else{
                //const newPatient = {...formValues, doctorId: doctor?.id || 0}
                console.log('editando al paciente con los nuevos datos');
                console.log(formValues);
                //become "btn changePhoto" visible
                document.getElementById('btn-changePhoto')?.classList.remove('block');
                document.getElementById('btn-changePhoto')?.classList.add('hidden');
                //hide "edit information button"
                document.getElementById('btn-edit')?.classList.remove('hidden');
                document.getElementById('btn-edit')?.classList.add('inline-flex');
                //became "btn submit" visible
                document.getElementById('btn-submit')?.classList.remove('inline-flex');
                document.getElementById('btn-submit')?.classList.add('hidden');
                const inputs = document.querySelectorAll('.input');
                inputs.forEach(input =>{
                    (input as HTMLInputElement).disabled = true;
                });
                //send new data to doctore store
                editDoctor(formValues);
                //toast.success("Patient created correctly");
            }
        }
    }
  return (
    <>
        <div className="flex flex-col justify-center items-center container md:flex-row md:items-start">
            <div className="p-6  flex flex-col justify-center items-center">
                <div className="w-60 h-60 mx-auto profile-photo" style={{ backgroundImage: `url(${doctor?.profilePicture})` }}>

                </div>
                <button className=" edit-photo hidden p-2 mt-3 w-60 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 font-medium "
                    id="btn-changePhoto"
                    disabled
                    >Edit profile photo </button>
            </div>
            <div className="p-0 w-full lg:w-auto ">
                <form action="">
                { errorMessage.status == true && <div className="text-center text-white bg-red-500">{errorMessage.message}</div>}
                    <div className=" mb-2 flex flex-col ">
                            <label htmlFor="name" className="font-medium">Nombre</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="input w-full  border rounded h-9 focus:outline-none focus:border-slate-400 p-2 lg:w-96" 
                                disabled
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className=" mb-2 flex flex-col ">
                            <label htmlFor="name" className="font-medium">Phone</label>
                            <input 
                                type="text" 
                                name="phone" 
                                id="phone" 
                                className="input border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                disabled
                                value={formValues.phone}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className=" mb-2 flex flex-col ">
                            <label htmlFor="name" className="font-medium">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="input border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                disabled
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className=" mb-2 flex flex-col ">
                            <label htmlFor="name" className="font-medium">Medical Speciality</label>
                            <input 
                                type="text" 
                                name="medicalSpeciality" 
                                id="medicalSpeciality" 
                                className="input border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                disabled
                                value={formValues.medicalSpeciality}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className=" mb-2 flex flex-col ">
                            <label htmlFor="name" className="font-medium">Office Address</label>
                            <input 
                                type="text" 
                                name="officeAddress" 
                                id="officeAddress" 
                                className="input border rounded h-9 focus:outline-none focus:border-slate-400 p-2" 
                                disabled
                                value={formValues.officeAddress}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className="mt-5 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-slate-600 text-white border px-9 py-2 text-sm font-semibold shadow-sm hover:bg-slate-700 sm:ml-3 sm:w-auto"
                                onClick={handleEdit}
                                id="btn-edit"
                            >
                                Edit information
                            </button>
                            <button
                                type="button"
                                className="hidden  w-full justify-center rounded-md bg-slate-600 text-white border px-9 py-2 text-sm font-semibold shadow-sm hover:bg-slate-700 sm:ml-3 sm:w-auto"
                                onClick={handleSubmit}
                                id="btn-submit"
                            >
                                Save changes
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Settings
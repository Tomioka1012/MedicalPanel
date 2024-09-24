import { ToastContainer } from "react-toastify"
import { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/Home'
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Settings from "./pages/Settings";
//import images
import doctor1 from './img/doctor-1.jpg';
import doctor2 from './img/doctor-2.jpg';
import doctor3 from './img/doctor-3.jpg';

import { useDoctorStore } from './store/doctorStore';
import 'react-toastify/ReactToastify.css'
function App() {
  //usestore
  const {fetchDoctor,doctor,fetchAppointments,fetchpatients,fetchDoctors,doctors}= useDoctorStore();
  //usestate
  const [view,setView] = useState(localStorage.getItem('clicked-button')? localStorage.getItem('clicked-button') : 'Home');
  const [doctorActive,setDoctorActive] = useState(localStorage.getItem('activeDoctor')? Number(localStorage.getItem('activeDoctor')) : 1 );

  // useefect
  useEffect(() =>{
    if(doctors == null){
      fetchDoctors();
    }
    //show a message about how this proyect works
    //check if clicked button already exists in local storage
    const activeButtonId = localStorage.getItem('clicked-button');
    if (activeButtonId) {
      const activeButton = document.getElementById(activeButtonId);
      if (activeButton) {
        activeButton.classList.add('active-button');
      }
    }
    //
    
  },[])

//useefect
useEffect(() => {
  if(doctors == null){
    fetchDoctors();
  }
  if (doctorActive !== null) {
    fetchDoctors(); 
    fetchDoctor(doctorActive);
    fetchAppointments(doctorActive);
    fetchpatients(doctorActive);
  }
  //console.log(doctor);
}, [doctorActive, fetchDoctor,fetchDoctors])

/* */
 // Este useEffect asegura que el dropdown, button y content existan antes de intentar usarlos
 useEffect(() => {
  const dropdown = document.querySelector('.dropdown')!;
  const button = document.getElementById('dropdownButton')!;
  const content = document.getElementById('dropdownContent')!;

  if (!dropdown || !button || !content) {
    console.error('No se encontraron los elementos del dropdown.');
    return;
  }

  let selectedValue = ''; // Cambiado a 'let' para permitir reasignación

  function updateButton(value: string, text: string, imgSrc: string) {
    button.innerHTML = `<img src="${imgSrc}" alt="Selected Doctor"> ${text}`;
    selectedValue = value;
    const event = new Event('change');
    button.dispatchEvent(event);
  }

  // Toggle dropdown visibility
  button.addEventListener('click', () => {
    dropdown.classList.add('show');
  });

  // Handle option selection
  content.addEventListener('click', function (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('div[data-value]')) {
      const value = target.getAttribute('data-value');
      const text = target.textContent?.trim() || '';
      const imgSrc = target.getAttribute('data-image');
      updateButton(value!, text, imgSrc!);
      dropdown.classList.remove('show');
      console.log('Selected value:', value);
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!dropdown.contains(target)) {
      dropdown.classList.remove('show');
    }
  });

  // Handle the original select change event
  button.addEventListener('change', () => {
    if (selectedValue) {
      handleChangeDoctorId(Number(selectedValue));
    }
  });

  return () => {
    // Limpieza: Remover los event listeners cuando el componente se desmonta
    button.removeEventListener('click', () => {
      dropdown.classList.toggle('show');
    });
    content.removeEventListener('click', function (e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('div[data-value]')) {
        const value = target.getAttribute('data-value');
        const text = target.textContent?.trim() || '';
        const imgSrc = target.getAttribute('data-image');
        updateButton(value!, text, imgSrc!);
        dropdown.classList.remove('show');
        console.log('Selected value:', value);
      }
    });
    document.removeEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!dropdown.contains(target)) {
        dropdown.classList.remove('show');
      }
    });
  };
}, []);
/* */

  /*show a doctor*/
  const handleChangeDoctorId = (doc:number) => {
    setDoctorActive(doc);
    localStorage.setItem('activeDoctor',doc.toString());
    
  }
    // console.log(doctors)
  /*show the clicked section*/
  const handleSection = (id:string) =>{
    
    //create a variable
    let clickedButton = document.querySelector(`#${id}`);
    //check if others clicked buttons already exists
    if(document.querySelector('.active-button')){
      
      document.querySelector('.active-button')?.classList.remove('active-button')

    }
    //add styles to button already clicked
    clickedButton?.classList.add('active-button');
    localStorage.setItem('clicked-button',id);
    setView(id);
    

  }
  //Show clicked view
  const showView = () =>{
      switch(view){
        case 'Home':
          return <Home/>;
        case 'Appointments':
          return <Appointments />;
        case 'Patients':
          return <Patients />;
        case 'Settings':
          return <Settings />;
        default:
          return <Home />;
      }
  }
  

  return (
    <>
      <header className='w-screen flex justify-between px-7 py-3 shadow-sm ps-16 sm:ps-60  '>
          <a href="#" className='ms-3 text-xl my-auto'> Medical Panel</a>
          <div className="dropdown">
            <button id="dropdownButton" className="dropdown-button text-gray-700"> Choose a Doctor <i className="fa-solid fa-caret-down ms-3 text-gray-400"></i>
            </button>
            <div id="dropdownContent" className="dropdown-content">
              <div data-value="1" data-image={doctor1}>
                <img src={doctor1} alt="Doctor 1"/> Doctor 1
              </div>
              <div data-value="2" data-image={doctor2}>
                <img src={doctor2} alt="Doctor 2"/> Doctor 2
              </div>
              <div data-value="3" data-image={doctor3}>
                <img src={doctor3} alt="Doctor 3"/> Doctor 3
              </div>
           </div>
</div>
      </header>
      <div className='sidebar h-screen absolute top-0 start-0 bg-white justify-center sm:justify-start pt-0 w-16 sm:w-52 flex flex-col sm:pt-16 '>
        {/* client information*/}
        <div className='hidden sm:flex flex-col mt-2 '>
          <div className='rounded-full w-32 h-32 bg-slate-100 mx-auto profile-photo' style={{ backgroundImage: `url(${doctor?.profilePicture})` }} >
            
          </div>
          <div className='text-center mt-3'>
            <p className='font-bold text-xl'>{doctor?.name}</p>
            <p className='text-blue-400'>{doctor?.medicalSpeciality}</p>
          </div>
          <button className='bg-slate-100 font-semibold rounded py-1 mx-3 mt-3 hover:bg-slate-200'>
              Edit Profile
          </button>
        </div>
        {/* Actions*/}
        <div className='flex flex-col mt-5'>
          {/*Home*/ }
          <button className='py-2 mt-2 mx-1 sm:mx-3 px-4 rounded hover:bg-slate-100 hover:font-semibold text-start btn-section '
          id='Home'
          onClick={(e)=>handleSection(e.currentTarget.id)}
          >
            <i className="fa-solid fa-house me-2  "></i> <span className='hidden sm:inline'>Home</span>
          </button>
          {/*Appointments*/ }
          <button className='py-2 mt-2 mx-1 sm:mx-3 px-4 rounded hover:bg-slate-100 hover:font-semibold text-start btn-section'
          id='Appointments'
          onClick={ (e)=>handleSection(e.currentTarget.id)}
          >
            <i className="fa-solid fa-calendar-days me-2 "></i> <span className='hidden sm:inline'>Appointments</span>
          </button>
          {/*Patients*/ }
          <button className='py-2 mt-2 mx-1 sm:mx-3 px-4 rounded hover:bg-slate-100 hover:font-semibold text-start btn-section'
          id='Patients'
          onClick={ (e)=>handleSection(e.currentTarget.id)}
          >
            <i className="fa-solid fa-user-group me-2 text-center"></i> <span className='hidden sm:inline'>Patients</span>
          </button>
            {/*settings*/ }
          <button className='py-2 mt-2 mx-1 sm:mx-3 px-4 rounded hover:bg-slate-100 hover:font-semibold text-start btn-section'
          id='Settings'
          onClick={ (e)=>handleSection(e.currentTarget.id)}
          >
            <i className="fa-solid fa-gear me-2"></i> <span className='hidden sm:inline'>Settings</span>
            </button>
        </div>
        

      </div>
      <main className=' h-100 ms-16 sm:ms-52 border shadow-sm p-5 overflow-x-hidden' >
        {showView()}
      </main>
      <ToastContainer/>
      
    </>
  )
}

export default App

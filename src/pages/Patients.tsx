import { useEffect, useState } from "react";
import PatientRow from "../components/PatientRow"
import { search } from "../helpers/search";
import { useDoctorStore } from "../store/doctorStore"
import { Patient } from "../types/types";
import EditPatients from "./EditPatients";
import CreatePatient from "./CreatePatient";


const Patients = () => {
  //zustand
  const {patients} = useDoctorStore();
  //usestore
  const [entries,setEntries] = useState(20);
  const [listEntries, setListEntries] = useState<Patient[]>([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [pagination,setPagination] = useState(0);
  // Modal patient
  const [modalPatient,setModalPatient] = useState(false);
  const[modalCreatePatient,setModalCreatePatient] = useState(false);
  //
  
  //función del input search
  useEffect(()=>{
    search();
  },[]);
  // Calcular paginación
  useEffect(() => {
    const totalPages = Math.ceil(patients.length / entries);
    setPagination(totalPages);
   // console.log('actualizando las entradas a' ,entries, 'entradas por página');
    // Calcula las entradas para la página actual
    const indexOfLastEntry = currentPage * entries;
    //console.log('indexOfLastEntry:',indexOfLastEntry);
    const indexOfFirstEntry = indexOfLastEntry - entries;
   // console.log('indexOfFirstEntry:',indexOfFirstEntry);
    const currentEntries = patients.slice(indexOfFirstEntry, indexOfLastEntry);
  //  console.log('currentEntries:',currentEntries);
    setListEntries(currentEntries);
   // console.log('totalPages:',pagination);
   // console.log('currentPage:',currentPage);
  }, [patients, entries, currentPage]);

  return (
    <>
        <section className="patients-container w-full">
            <div className="Home container mx-auto ">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h1 className="font-bold text-3xl mb-5">Patients</h1>
                  <div className="self-end sm:self-auto">
                    <button className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-slate-600 font-medium "
                    onClick={() => setModalCreatePatient(true)}
                    title="Create a new patient"
                    >New patient </button>
                  </div>
                </div>
                <p className="text-slate-400">{patients.length} Patients</p>
                <div className="list-container flex flex-col mt-2 ">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="entries-input flex  sm:justify-center items-center mb-2">
                      <div>
                        <select  className=' bg-slate-100  rounded text-slate-600 p-1 w-16'
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{setCurrentPage(1); setEntries(Number(e.target.value))}}
                        >
                          <option value="0" disabled>choose an option</option>
                          <option value="20">20</option>
                          <option value="10" >10</option>
                          <option value="15">15</option>
                        </select>
                      </div>
                      <p className="ms-2 text-slate-400 text-sm">Entries per page</p>
                    </div>
                    <div className="search-patients flex items-center bg-slate-100 text-slate-500 rounded mb-3 w-full sm:w-1/3">
                        <span className="px-2"><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input type="search" name="" id="searchInput" placeholder="search patients" className="py-2 w-full bg-transparent px-1"/>
                    </div>
                  </div>
                  <div className="overflow-x-scroll">
                    <div className="patients-list border rounded-md ">
                    <table className="table-auto w-full" id="dataTable">
                      <thead className="border-b ">
                        <tr className="" >
                          <th className="text-start p-2">Name</th>
                          <th className="text-start p-2">ID</th>
                          <th className="text-start p-2">Number</th>
                          <th className="text-start p-2">Email</th>
                          <th className="text-start p-2">Medical History</th>
                          <th className="text-center p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listEntries.map((patient: Patient) =>(
                        <PatientRow
                          key={patient.id}
                          patient={patient}
                          setModalPatient={setModalPatient}
                        />
                      ))}
                      </tbody>
                    </table>

                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between  border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <div className="flex flex-1 justify-between sm:hidden">
                        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={()=> currentPage == 1? setCurrentPage(1) :setCurrentPage(currentPage-1)}>Previous</a>
                        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={()=> setCurrentPage(currentPage+1)}>Next</a>
                      </div>
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium"> {currentPage} </span>
                            to
                            <span className="font-medium"> {pagination} </span>
                            of
                            <span className="font-medium"> {patients.length} </span>
                            results
                          </p>
                        </div>
                        <div>
                          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={()=> currentPage == 1? setCurrentPage(1) :setCurrentPage(currentPage-1)}
                            >
                              <span className="sr-only">Previous</span>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                              </svg>
                            </a>
                            {Array.from({ length: pagination }).map((_, index) => (
                              <a href="#" key={index} className={`relative  inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${ index + 1 === currentPage ? 'z-10  bg-slate-100  text-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300' : ' text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}>{index + 1}</a>
                            ))}
                            
                           
                            <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={()=> setCurrentPage(currentPage+1)}
                            >
                              <span className="sr-only">Next</span>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                              </svg>
                            </a>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
            

        </section>
        {
          modalPatient &&
          <EditPatients
            setModalPatient = {setModalPatient}
          />
        }
        {
          modalCreatePatient &&
          <CreatePatient
            setModalCreatePatient = {setModalCreatePatient}
          />
        }
        
    </>
  )
}

export default Patients
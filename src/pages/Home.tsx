import Comment from "../components/Comment"
import { useDoctorStore } from "../store/doctorStore"



const Home = () => {

    const {doctor,patients,appointments} = useDoctorStore();
  return (
    <>
        <section className="home-container w-full">
            <div className="Home container mx-auto ">
                <h1 className="font-bold text-3xl mb-5">Welcome, {doctor?.name}</h1>
                <div className="hero border flex flex-col">
                    <div className="hero-container"></div>
                    <div className="text-white text-center font-bold text-4xl absolute bottom-1/2 start-1/3 hidden">A place for you and your patients</div>
                </div>
                <div className="overview mt-7">
                    <h2 className="font-bold text-xl mb-5">Overview</h2>
                    <div className="grid-container mx-auto">
                        <div className="s1 flex flex-col justify-start items-start relative overflow-hidden">
                            <div>
                                <p className="font-bold text-2xl">Appointments</p>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-gray-400">{appointments.length} </p>
                            </div>
                            <div className="absolute -bottom-6 right-3">
                                <img src="/src/img/appoint-icon.png" alt="icon doctor"  />
                            </div>
                        </div>
                        <div className="s2 flex flex-col justify-start items-start relative overflow-hidden">
                            <div>
                                    <p className="font-bold text-2xl">Patients</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-gray-400">{patients.length} </p>
                                </div>
                                <div className="absolute -bottom-6 right-3">
                                    <img src="/src/img/patient-icon.png" alt="icon doctor"  />
                                </div>
                            </div>
                            <div className="s4 flex flex-col justify-start items-start relative overflow-hidden">
                                <div>
                                    <p className="font-bold text-2xl">{doctor?.medicalSpeciality}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-gray-400">Specialist</p>
                                </div>
                                <div className="absolute -bottom-6 right-3">
                                    <img src="/src/img/icon-doctor.png" alt="icon doctor" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews mt-7">
                    <h2 className="font-bold text-xl mb-5">Reviews</h2>
                    <div className="reviews-container grid grid-cols-1 lg:grid-cols-2">
                        <div className="graph  p-2 flex">
                            <div className=" h-full w-1/3 flex flex-col items-center  ">
                                <p className="text-2xl font-bold ">4.0</p>
                                <div className="text-slate-400 text-xs sm:text-lg">
                                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                                </div>
                                <p className="text-sm">(350 reviews)</p>
                            </div> 
                            <div className=" h-full w-2/3">
                                <div className="flex items-center gap-x-2">
                                    <p>5</p>
                                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-yellow-500" style={{ width: `${60}%` }}></div>
                                    </div>
                                    <p className="text-slate-500">60%</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <p>4</p>
                                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-yellow-500" style={{ width: `${30}%` }}></div>
                                    </div>
                                    <p className="text-slate-500">30%</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <p>3</p>
                                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-yellow-500" style={{ width: `${5}%` }}></div>
                                    </div>
                                    <p className="text-slate-500">5%</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <p>2</p>
                                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-yellow-500" style={{ width: `${3}%` }}></div>
                                    </div>
                                    <p className="text-slate-500">3%</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <p>1</p>
                                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-yellow-500" style={{ width: `${2}%` }}></div>
                                    </div>
                                    <p className="text-slate-500">2%</p>
                                </div>
                            </div>  
                        </div>
                        <div className="comments  p-2">
                            <Comment/>
                            <Comment/>
                            <Comment/>  
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                        </div>

                    </div>

                </div>
            </div>
            

        </section>
    </>
  )
}

export default Home

import { useDoctorStore } from "../store/doctorStore"

const Comment = () => {
    const {doctor} = useDoctorStore();
  return (
    <>
        <div className="flex-col p-2 border rounded mb-2">
            <div className="flex items-center">
                <div className="rounded-full w-9 h-9 bg-slate-100 ">

                </div>
                <div className="ps-3">
                    <p className="">Sofia Lee</p>
                    <p className="text-slate-500 text-xs">10/06/24</p>
                </div>

            </div>
                <div className="pt-3 ">
                    <div className="text-slate-400 text-xs">
                        <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i>
                    </div>
                    <p>{doctor?.name} is very kind and patient!</p>

                </div>
                                    
        </div>
    </>
  )
}

export default Comment
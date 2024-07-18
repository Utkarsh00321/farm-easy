import { CiSearch } from "react-icons/ci";
import FarmerLayout from "../FarmerLayout";

function page() {
    return (
        <FarmerLayout>
            <div className="h-[15rem] bg-green-950/10 flex items-center justify-center">
                <div className="h-[3rem] w-[60%] bg-white drop-shadow-lg mt-10 rounded-full overflow-hidden flex">
                    <div className="h-full w-[10%] flex items-center justify-center border-r-2">
                        INDIA
                    </div>
                    <input type="text" className="h-full w-[70%] px-5 outline-0" placeholder="Enter pin-code" />
                    <button className="bg-[#32a84b] w-[20%] text-white font-semibold flex items-center justify-center gap-2">
                        <CiSearch size={20} />
                        Find
                    </button>
                </div>
            </div>
            <div className="px-14 mt-4">
                <p className="text-lg font-semibold">Vets near your area</p>
                <div className="flex flex-col items-center mt-5 gap-5">
                    {
                        [...Array(5)].map((_, ind) => (
                            <div key={ind} className="h-auto w-[90%] bg-white p-6 flex gap-5 rounded-md drop-shadow-md hover:drop-shadow-lg border">
                                <div className="flex items-center justify-center w-[10%]">
                                    <div className="h-[5.5rem] w-[5.5rem] bg-slate-600 rounded-full animate-pulse">

                                    </div>
                                </div>
                                <div className="w-[20%]">
                                    <p className="text-lg font-semibold mb-2">Dr. Hacker saheb</p>
                                    <p>Specialization: XYSL</p>
                                    <p>Rating: 4.5/5</p>
                                </div>
                                <div className="w-[40%]">
                                    <p>Address:</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique alias ea tempora a ab consequatur ipsam non, inventore atque eos.</p>
                                </div>
                                <div className="w-[25%] flex flex-col gap-2 items-end">
                                    <button className="rounded-lg w-[9rem] px-5 py-1 bg-[#32a84b] text-white border-2  border-[#32a84b] hover:bg-transparent hover:text-black transition">Video Call</button>
                                    <button className="rounded-lg w-[9rem] px-5 py-1 hover:bg-[#32a84b] border-2  border-[#32a84b] text-black hover:text-white transition">Chat</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </FarmerLayout>
    )
}

export default page

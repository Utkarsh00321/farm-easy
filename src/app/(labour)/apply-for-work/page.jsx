import { CiSearch } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";
import LabourPageLayout from "../LabourPageLayout";

const page = () => {
    return (
        <LabourPageLayout>
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
                            <div key={ind} className="relative h-auto w-[90%] bg-white p-6 flex gap-4 rounded-md drop-shadow-md hover:drop-shadow-xl border">
                                <p className="absolute right-0 top-0 p-2 px-3 bg-[#32a84b] text-white"> 12 June 2023</p>
                                <div className="w-[70%]">
                                    <p className="text-lg font-semibold mb-2">Hiring for Labour</p>
                                    <p><span className="font-semibold">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, officiis. Veniam sit non iste cumque sint quas facilis maiores voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, omnis.</p>
                                    <p><span className="font-semibold">Address:</span> Lorem ipsum dolor sit amet consectetur adipisicing eiciis. Veniam sit non iste .</p>
                                </div>
                                <div className="w-[20%] flex flex-col justify-center">
                                    <p><span className="font-semibold">Number of labours:</span> 10</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Pay per hour:</span>
                                        <div className="flex items-center">
                                            <LiaRupeeSignSolid size={20} color="#00000" className="text-black" />
                                            1,000
                                        </div>
                                    </div>
                                    <p><span className="font-semibold">Number of days: </span> 4</p>
                                </div>
                                <div className="w-[8%] flex items-center justify-center">
                                    <button className="px-6 py-1 hover:bg-[#32a84b] border-2 border-[#32a84b] hover:text-white bg-transparent rounded-md transition">Apply</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </LabourPageLayout>
    )
}

export default page

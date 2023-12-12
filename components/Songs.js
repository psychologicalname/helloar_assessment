import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

const Songs = () => {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className='grid grid-cols-6'>
            <div className='col-span-1 border-r border-gray-300'>
                <h1 className='text-[#552583] font-bold text-[36px] text-center px-10 mb-4'>Logo</h1>
                <div className={`flex items-center gap-2 px-4 py-2 ${isActive ? 'bg-[#E6F7FF] border-r-4 border-[#1890FF]' : ''}`}>
                    <CgMenuGridR className="text-2xl text-[#545454]" />
                    <p className="text-[14px] text-[#1890FF]">Songs</p>
                </div>
            </div>
            <div className='col-span-5'>
                <div className="flex items-center justify-between px-8">
                    <h2 className='font-medium text-[20px] text-black'>Songs</h2>
                    <button className='bg-[#FDB927] text-[14px] px-4 py-2'>Add Songs</button>
                </div>
                <div className="mt-8 border-t border-gray-300">
                    <table className="w-full text-left rtl:text-right">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th scope="col" className="px-6 py-3 font-medium text-[14px] pt-10 pb-5">SONG NAME</th>
                                <th scope="col" className="px-6 py-3 font-medium text-[14px] pt-10 pb-5">SOURCE</th>
                                <th scope="col" className="px-6 py-3 font-medium text-[14px] pt-10 pb-5">ADDED ON</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300 text-[14px]">
                                <td className="py-8">Song Name</td>
                                <td>Youtube</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Songs

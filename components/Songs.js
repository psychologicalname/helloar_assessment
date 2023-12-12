import { useEffect, useRef, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import AddSong from "./AddSong";
import { MdOutlinePlayArrow } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import * as Slider from '@radix-ui/react-slider';

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

const Songs = () => {
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true);

    const audio = useRef();

    useEffect(() => {
        mutate()
    }, [])

    const mutate = () => {
        fetch('/api/songs')
            .then(res => res.json())
            .then(res => setData(res))
            .then(() => setLoading(false))
    }

    useEffect(() => {
        if (isActive !== false) {
            audio.current.play();
            setIsPlaying(true);
            setInterval(() => {
                if (audio.current)
                    setDuration(audio.current.currentTime * 100 / audio.current.duration);
                else
                    setDuration(0);
            }, 1000);
        }
    }, [isActive])

    const handleToggle = () => {
        if (isPlaying) {
            audio.current.pause();
            setIsPlaying(false);
        }
        else {
            audio.current.play();
            setIsPlaying(true);
        }
    }

    const handlePrev = () => {
        if (isActive === 0) {
            setIsActive(data.length - 1);
        }
        else {
            setIsActive(isActive - 1);
        }
    }

    const handleNext = () => {
        if (isActive === data.length - 1) {
            setIsActive(0);
        }
        else {
            setIsActive(isActive + 1);
        }
    }

    const handleProgress = (value) => {
        console.log(value[0]);
        audio.current.currentTime = value[0] * audio.current.duration / 100;
    }

    const handleLogOut = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    const handleDelete = (id) => {
        fetch('/api/songs', {
            method: 'DELETE',
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.id) {
                    mutate();
                }
                else {
                    alert(json?.message || 'Something went wrong! Try again...')
                }
            });
    }

    return (
        <div className='grid grid-cols-6'>
            <div className='col-span-1 h-screen border-r border-gray-200 flex flex-col justify-between'>
                <div>
                    <h1 className='text-[#552583] font-bold text-[36px] text-center px-10 mb-4'>Logo</h1>
                    <div className={`flex items-center gap-2 px-4 py-2 bg-[#E6F7FF] border-r-4 border-[#1890FF]`}>
                        <CgMenuGridR className="text-2xl text-[#545454]" />
                        <p className="text-[14px] text-[#1890FF]">Songs</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 mb-8" onClick={handleLogOut}>
                    <IoMdLogOut className="text-2xl text-[#545454]" />
                    <p className="text-[14px] text-black/80">Logout</p>
                </button>
            </div>
            <div className='col-span-5 flex flex-col justify-between h-screen'>
                <div>
                    <div className="flex items-center justify-between px-8">
                        <h2 className='font-bold text-[20px] text-black mt-4'>Songs</h2>
                        <AddSong />
                    </div>
                    <div className="mt-8 border-t border-gray-200 px-4 overflow-y-scroll">

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th scope="col" className="px-6 py-3 font-semibold text-[14px] pt-10 pb-5">SONG NAME</th>
                                    <th scope="col" className="py-3 font-semibold text-[14px] pt-10 pb-5">SOURCE</th>
                                    <th scope="col" className="py-3 font-semibold text-[14px] pt-10 pb-5">ADDED ON</th>
                                    <th scope="col" className="py-3 font-medium text-[14px] pt-10 pb-5"></th>
                                    <th scope="col" className="py-3 font-medium text-[14px] pt-10 pb-5"></th>
                                </tr>
                            </thead>
                            {loading ?
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1890FF] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                                :
                                <tbody>
                                    {data.map((song, k) => <tr key={k} className="border-b border-gray-200 text-[14px]">
                                        <td className="py-8 flex items-center">
                                            <img src={song.thumbnail} alt={song.name} className='h-16 w-16 mr-4' />
                                            {song.name}
                                        </td>
                                        <td>{song.source}</td>
                                        <td>{convertDate(song.added_on)}</td>
                                        <td onClick={() => setIsActive(k)} className="cursor-pointer"><img src="/play.png" /></td>
                                        <td><img src="/delete.png" onClick={() => handleDelete(song.id)} className="cursor-pointer" /></td>
                                    </tr>)}
                                </tbody>
                            }

                        </table>
                    </div>
                </div>
                {isActive !== false ? <div className="sticky h-20 w-full border-t bottom-0">
                    <Slider.Root onValueChange={handleProgress} className="w-full h-2 flex relative items-center" value={[duration]} max={100} step={1}>
                        <Slider.Track className="bg-gray-300 relative h-2 w-full">
                            <Slider.Range className="absolute bg-gray-700 h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 bg-yellow-500 rounded-full focus:outline-none" />
                    </Slider.Root>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={data[isActive].thumbnail} alt={data[isActive].name} className='h-16 w-16 mr-2' />
                            <span className="font-bold">{data[isActive].name}</span>
                        </div>
                        <div className="flex items-center gap-4 mr-8">
                            <audio src={data[isActive].link} ref={audio} />
                            <img onClick={handlePrev} src="/prev.png" />
                            {isPlaying ? <img onClick={handleToggle} src="/pause.png" /> : <MdOutlinePlayArrow className="text-3xl" onClick={handleToggle} />}
                            <img onClick={handleNext} src="/next.png" />
                        </div>
                    </div>
                </div> : null}
            </div>
        </div >
    )
}

export default Songs

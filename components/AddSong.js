import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineUpload } from "react-icons/ai";

const AddSong = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [songData, setSongData] = useState({
        name: '',
        link: '',
        source: '',
        thumbnail: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    useEffect(() => {
        if (selectedImage) {
            toBase64(selectedImage).then(res => setImageUrl(res));
        }
    }, [selectedImage]);

    const handleChange = (e) => {
        setSongData({ ...songData, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/songs', {
            method: 'POST',
            body: JSON.stringify({
                name: songData.name,
                link: songData.link,
                source: songData.source,
                thumbnail: imageUrl,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                if (json.id) {
                    setIsOpen(false);
                    setSelectedImage(null);
                    setImageUrl(null);
                    setSongData({
                        name: '',
                        link: '',
                        source: '',
                        thumbnail: '',
                    });
                    window.location.reload();
                }
                else {
                    alert(json?.message || 'Something went wrong! Try again...')
                }
            });
    }

    return (
        <>
            <button className='bg-[#FDB927] text-[14px] px-4 py-2' type="button"
                onClick={() => setIsOpen(true)}>Add Songs</button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[16px] font-bold text-black border-b border-gray-300 py-4"
                                    >
                                        Add Song
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-6'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='name' className='text-[14px] text-black/80'>Song Name</label>
                                            <input onChange={handleChange} type='text' id='name' placeholder='Song Name' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='link' className='text-[14px] text-black/80'>Song Link</label>
                                            <input onChange={handleChange} type='text' id='link' placeholder='URL' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='source' className='text-[14px] text-black/80'>Song Source</label>
                                            <input onChange={handleChange} type='text' id='source' placeholder='Source Name' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='thumbnail' className='flex gap-1 items-center text-[14px] text-black/80 border border-[#D9D9D9] w-fit px-3 py-2 rounded-md cursor-pointer'>
                                                <AiOutlineUpload />
                                                <span>Click to Upload Profile Thumbnail</span>
                                            </label>
                                            <input id='thumbnail' type='file' accept="image/" style={{ display: 'none' }} onChange={e => setSelectedImage(e.target.files[0])} />
                                            {imageUrl && selectedImage && (
                                                <div className='border border-[#D9D9D9] px-3 py-1 rounded-md flex gap-2 items-center'>
                                                    <img src={imageUrl} alt={selectedImage.name} className='h-16' />
                                                    <p className='text-[14px] text-[#1890FF]'>{selectedImage.name}</p>
                                                </div>
                                            )}
                                        </div>

                                        <p className='text-[14px] text-black/40'>Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels</p>

                                        <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-300 pt-3">
                                            <button
                                                type="button"
                                                className="border border-[#D9D9D9] text-black text-[14px] px-4 py-1.5 rounded-md"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setSelectedImage(null);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className={`bg-[#1890FF] px-4 py-1.5 rounded-md text-white text-[14px] ${loading ? 'disabled opacity-70' : ''}`}>
                                                {loading ? 'Adding' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddSong

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineUpload } from "react-icons/ai";

const AddSong = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [songData, setSongData] = useState({
        name: '',
        link: '',
        source: '',
        thumbnail: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/songs', {
            method: 'POST',
            body: JSON.stringify({

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {

            });
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Open dialog
                </button>
            </div>

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
                                            <input type='text' id='name' placeholder='Song Name' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='name' className='text-[14px] text-black/80'>Song Link</label>
                                            <input type='text' id='name' placeholder='URL' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='name' className='text-[14px] text-black/80'>Song Source</label>
                                            <input type='text' id='name' placeholder='Source Name' className='border border-[#D9D9D9] rounded-md placeholder:text-[#D9D9D9] text-[14px] focus:outline-none px-3 py-2' />
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
                                                className='bg-[#1890FF] px-4 py-1.5 rounded-md text-white text-[14px]'>
                                                Add
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

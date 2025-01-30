import React, { useState, useRef } from 'react';
import { BsCloudUpload } from "react-icons/bs";

const StaffForm = () => {
    const inputRef = useRef(null);

    const [ file, setFile ] = useState(null);
    const [ dragActive, setDragActive ] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        if (event.dataTransfer.files.length) {
        setFile(event.dataTransfer.files[0]);
        }
    };

    const handleChange = (event) => {
        if (event.target.files.length) {
        setFile(event.target.files[0]);
        }
    };

  return (
    <div className='w-full h-fit py-4'>
        <p className='text-sm text-[#606B85]'>Formats supported - excel</p>
        
        <div
            className={`w-[34.125rem] overflow-hidden cursor-pointer mt-2 flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed h-[11.875rem] bg-[#F4F9FF] relative transition-colors ${
                    dragActive ? 'border-blue-500' : 'border-[#001489]'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
        >
            <div className='w-[2.75rem] aspect-square rounded-full bg-white flex items-center justify-center text-2xl text-[#606B85]'>
                <BsCloudUpload />
            </div>

            <p className='text-sm text-[#121C2D]'>
                {file ? file.name : "Browse files or drag them here"}
            </p>

            <input
                type='file'
                ref={inputRef}
                className='hidden'
                onChange={handleChange}
            />
        </div>
    </div>
  );
};

export default StaffForm;
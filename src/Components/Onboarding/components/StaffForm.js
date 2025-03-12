import React, { useState, useRef } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import * as XLSX from "xlsx";

const StaffForm = ({
    sendData,
    setSendData
}) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    // const [parsedData, setParsedData] = useState([]);

    const allowedExtensions = ['xls', 'xlsx', 'csv'];

    const validateFile = (file) => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    };

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
            const droppedFile = event.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
                parseFile(droppedFile);
            } else {
                alert("Invalid file type. Please upload an Excel or CSV file.");
            }
        }
    };

    const handleChange = (event) => {
        if (event.target.files.length) {
            const selectedFile = event.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
                parseFile(selectedFile);
            } else {
                alert("Invalid file type. Please upload an Excel or CSV file.");
            }
        }
    };

    const parseFile = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Transform to match the required structure
            const formattedData = jsonData.map((row) => ({
                name: row.Name || row.name,
                phone: row.Phone || row.phone,
                email: row.Email || row.email,
                password: row.Password || row.password,
            }));

            // setParsedData(formattedData);

            console.log(formattedData)
            
            setSendData({ ...sendData, staffs: formattedData });
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    };

    return (
        <div className='w-full h-fit py-4'>
            <p className='text-sm text-[#606B85]'>Formats supported - Excel (.xls, .xlsx) & CSV (.csv)</p>
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
                    accept=".xls,.xlsx,.csv"
                />
            </div>

            {/* {parsedData.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Parsed Data:</h3>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm">
                        {JSON.stringify(parsedData, null, 2)}
                    </pre>
                </div>
            )} */}
        </div>
    );
};

export default StaffForm;
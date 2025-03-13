import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import axiosInstance from "../../../utils/AxiosInstance";
import { HiPlusSm } from "react-icons/hi";
import deleteIcon from "../../../Assets/icons/deleteIcon.png";

const DepartmentForm = ({ sendData, setSendData }) => {
  const toggleRef = useRef(null);
  const dropdownRef = useRef(null);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/departments")
      .then((res) => {
        setOptions(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleServiceTag = (option) => {
    if (selectedOptions.some((obj) => obj.department === option.name)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item.department !== option.name)
      );

      setAppointmentSlots((prev) =>
        prev.filter((item) => item.title !== option.name)
      );

      setSendData((prevData) => {
        const arr = [...prevData.appointmentSlots].filter(
          (item) => item.departmentId !== option.id
        );
        return { ...prevData, appointmentSlots: arr };
      });
    } else {
      setSelectedOptions([
        ...selectedOptions,
        { department: option.name, basePrice: "" },
      ]);

      setAppointmentSlots((prev) => [
        ...prev,
        {
          title: option.name,
          id: option.id,
          value: [
            {
              name: "",
              description: "",
            },
          ],
        },
      ]);

      setSendData((prevData) => {
        const arr = [...prevData.appointmentSlots];
        const newArr = [
          ...arr,
          {
            name: "",
            description: "",
            departmentId: option.id,
          },
        ];

        // console.log("new", newArr)

        return { ...prevData, appointmentSlots: newArr };
      });
    }
  };

  const handleCheckboxChange = (department) => {
    setSendData((prevData) => {
      const updatedDepartment = prevData.departments.includes(department.id)
        ? prevData.departments.filter((id) => id !== department.id) // Remove if already selected
        : [...prevData.departments, department.id]; // Add if not selected

      return { ...prevData, departments: updatedDepartment };
    });

    handleServiceTag(department);
  };

  const handleDeleteDepartment = (dept) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => item.department !== dept)
    );

    const filterredDept = options.filter((item) => item.name === dept);

    setSendData((prevData) => {
      const updatedServices = prevData.departments.filter(
        (id) => id !== filterredDept[0].id
      );
      const updatedSlots = prevData.appointmentSlots.filter(
        (item) => item.departmentId !== filterredDept[0].id
      );

      return {
        ...prevData,
        departments: updatedServices,
        appointmentSlots: updatedSlots,
      };
    });

    setAppointmentSlots((prev) => prev.filter((item) => item.title !== dept));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddAppointmentSlots = (id, index) => {
    setAppointmentSlots((prev) => {
      return prev.map((slot, i) =>
        i === index
          ? {
              ...slot,
              value: [...(slot.value || []), { name: "", description: "" }],
            }
          : slot
      );
    });

    setSendData((prevData) => {
      const arr = [...prevData.appointmentSlots];
      const newArr = [
        ...arr,
        {
          name: "",
          description: "",
          departmentId: id,
        },
      ];

      return { ...prevData, appointmentSlots: newArr };
    });
  };

  const handleDeleteAppointmentSlot = (id, index) => {
    // setAppointmentSlots(prev => prev.filter((_, i) => i !== index));
    setAppointmentSlots((prev) =>
      prev.map((slot, i) =>
        i === index
          ? { ...slot, value: slot.value.filter((_, idx) => idx !== index) }
          : slot
      )
    );

    setSendData((prevData) => {
      const arr = [...prevData.appointmentSlots];
      const newArr = arr.filter((item) => item.departmentId !== id);

      return { ...prevData, appointmentSlots: newArr };
    });
  };

  const handleChangeAppointmentSlot = (
    index,
    id,
    field,
    newValue,
    departmentId
  ) => {
    setAppointmentSlots((prev) =>
      prev.map((slot, i) =>
        i === index
          ? {
              ...slot,
              value: slot.value.map((v, idx) =>
                idx === id ? { ...v, [field]: newValue } : v
              ),
            }
          : slot
      )
    );

    setSendData((prevData) => ({
      ...prevData,
      appointmentSlots: prevData.appointmentSlots.map((slot, i) =>
        slot.departmentId === departmentId
          ? { ...slot, [field]: newValue }
          : slot
      ),
    }));
  };

  const handleCreateDepartment = () => {
    toggleDropdown();

    setShowCreateDepartment(true);
  };

  return (
    <div className="w-full h-fit py-4">
      <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
        <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
        Department(s)
      </label>
      {/* {console.log(appointmentSlots)}, */}
      <div className="relative w-full">
        <div
          ref={toggleRef}
          className={`classic w-full mt-1 ${
            selectedOptions.length === 0 ? "p-2" : "p-1 min-h-[42px]"
          } border border-[#8891AA] focus:outline-none rounded-md`}
          onClick={toggleDropdown}
        >
          {selectedOptions.length === 0 && <p className="text-sm">Select</p>}

          <div className="flex w-full h-full items-center flex-wrap gap-1">
            {selectedOptions?.map((option, index) => (
              <span
                className="bg-[#F4F9FF] border capitalize border-[#CCE4FF] text-[#121C2D] px-2 py-1 rounded-full text-sm flex items-center"
                key={index}
              >
                {option.department}

                <button
                  className="ml-2 text-[#606B85]"
                  onClick={() => handleDeleteDepartment(option.department)}
                >
                  <IoClose />
                </button>
              </span>
            ))}
          </div>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 top-full left-0 w-full bg-white hideScrollbar shadow-2xl rounded-md border-[#8891AA] max-h-[18.5rem] overflow-y-auto"
          >
            <div className="h-[2.8rem] flex items-center justify-start px-3 border-b border-[#E1E3EA]">
              <button
                onClick={handleCreateDepartment}
                className="text-sm flex items-center justify-center gap-2"
              >
                <span className="text-[#606B85] text-2xl">+</span>
                <span className="text=[#121C2D] leading-none">
                  Create a department
                </span>
              </button>
            </div>
            <div className="h-[2.8rem] flex items-center justify-start gap-2 px-3 border-b border-[#E1E3EA]">
              <p className="text-[#606B85] text-lg">
                <IoSearchOutline />
              </p>
              <input
                type="search"
                placeholder="Search"
                className="border-0 w-full h-full focus:outline-none"
              />
            </div>
            <ul className="list-none p-0 m-0">
              {options?.map((option) => (
                <li
                  className="px-4 border-b last:border-b-0 border-[#E1E3EA] h-[2.8rem] flex items-center"
                  key={option}
                >
                  <label className="flex w-full items-center cursor-pointer capitalize">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 placeholder:italic text-sm"
                      checked={sendData.departments.includes(option.id)}
                      onChange={() => handleCheckboxChange(option)}
                    />

                    {option.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Service Value Currency Input */}
      {sendData.departments.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <p className="text-[#121C2D] font-semibold">Appointment Slots</p>
          </div>
        </div>
      )}

      {showCreateDepartment &&
        !isDropdownOpen &&
        appointmentSlots.length < 1 && (
          <div className="w-full mt-6">
            <div className="w-1/2">
              <label className="font-medium text-[#121C2D] text-sm flex items-center gap-1">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Department Name
              </label>
              <input
                type="text"
                placeholder="placeholder"
                className="border rounded-md mt-1 w-[500px] focus:outline-none p-2 text-sm border-[#8891AA] placeholder:italic"
              />
            </div>
          </div>
        )}

      <div className="flex flex-col gap-3 mt-6">
        {appointmentSlots.map((slot, index) => (
          <div key={index} className="">
            <p className="capitalize text-[#5A5A5A] text-sm ">{slot.title}</p>
            {slot.value.map((value, id) => (
              <div key={id} className="flex mt-4 gap-12 items-center">
                <div className="flex flex-col w-[35%] gap-1">
                  <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                    <div className="w-1 h-1 aspect-square rounded-full bg-[#EB5656]"></div>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    className="w-full border focus:outline-none rounded-md p-2 text-sm border-[#8891AA]"
                    value={value.name}
                    onChange={(e) =>
                      handleChangeAppointmentSlot(
                        index,
                        id,
                        "name",
                        e.target.value,
                        slot.id
                      )
                    }
                  />
                </div>
                <div className="flex flex-col w-[65%] gap-1">
                  <label className="font-medium text-[#121C2D] text-sm flex items-center gap-2">
                    Description
                  </label>
                  <div className="w-full flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Placeholder"
                      className="w-full border focus:outline-none rounded-md p-2 text-sm border-[#8891AA]"
                      value={value.description}
                      onChange={(e) =>
                        handleChangeAppointmentSlot(
                          index,
                          id,
                          "description",
                          e.target.value,
                          slot.id
                        )
                      }
                    />

                    {id === 0 ? (
                      <button
                        onClick={() =>
                          handleAddAppointmentSlots(slot.id, index)
                        }
                        className="w-[2.25rem] h-[2.25rem] aspect-square flex items-center justify-center bg-[#121C2D] text-white rounded-md text-2xl border border-[#394762]"
                      >
                        <HiPlusSm />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleDeleteAppointmentSlot(slot.id, index)
                        }
                        className="w-[2.25rem] h-[2.25rem] flex items-center justify-center"
                      >
                        <img src={deleteIcon} className="h-[1.25rem]" alt="" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentForm;

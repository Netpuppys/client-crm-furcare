import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";
import { useAlertContext } from "../../../../utils/AlertContext";
import ActiveButtons from "../../../../ui/ActiveButtons";
import chevronDown from "../../../../Assets/icons/chevronDown.png";
import Syncfusion from "../../../../ui/Syncfusion";

const dropDownList = ["English", "Hindi"];

const EditDocumentTemplate = ({ types, fetchData, openEditModule }) => {
  const { setAlert } = useAlertContext();

  const [formData, setFormData] = useState({
    type: openEditModule?.type,
    name: openEditModule?.name,
  });

  const [language, setLanguage] = useState([]); // Initial language
  const [documents, setDocuments] = useState(openEditModule.body);
  const [dropDownListStatic, setDropDownListStatic] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [active, setActive] = useState(openEditModule.active);
  const [showDropdown, setShowDropdown] = useState(false);

  // set static languages
  useEffect(() => {
    const langArr = openEditModule.body.map((item) => item.language);

    setDropDownListStatic(langArr);
    setSelectedLanguage(langArr[0]);
  }, [openEditModule]);

  function capitalizeWord(word) {
    if (!word) return ""; // Handle empty string
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  // set languages
  useEffect(() => {
    if (openEditModule.body) {
      const newArr = openEditModule.body.map((item) =>
        capitalizeWord(item.language)
      );
      setLanguage(newArr);
    }
  }, [openEditModule]);

  // remove language
  const removeLanguage = (langToRemove) => {
    setLanguage(language.filter((lang) => lang !== langToRemove));

    setDocuments((prev) =>
      prev.filter((item) => item.language !== langToRemove)
    );
  };

  // change disabled state
  useEffect(() => {
    const newArr = openEditModule.body.map((item) => item.language);

    const languagesChange = newArr.every(
      (value, index) => value === language[index]
    );

    if (
      formData.type === "" ||
      formData.name === "" ||
      documents[langIndex].body === "" ||
      language.length === 0
    ) {
      setDisabled(true);
      return;
    }

    if (
      formData.name === openEditModule.name &&
      formData.type === openEditModule.type &&
      documents[langIndex].body === openEditModule.body[langIndex].body &&
      languagesChange &&
      active === openEditModule.active
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [
    formData,
    language,
    openEditModule,
    selectedLanguageIndex,
    langIndex,
    documents,
    active,
  ]);

  const handleDropDownClick = (value) => {
    setLanguage((prev) => [...prev, value]);
    setDocuments((prev) => [
      ...prev,
      {
        language: value,
        body: "",
      },
    ]);
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const sendData = {
      type: formData.type,
      name: formData.name,
      body: documents,
      active: active,
    };

    axiosInstance
      .patch(`/api/v1/document-templates/${openEditModule.id}`, sendData)
      .then((res) => {
        setAlert("Changed Successfully");
        fetchData();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const handleQuillChange = (value, editIndex) => {
    console.log(value)
    setDocuments((prev) => {
      return prev.map((doc, index) =>
        index === editIndex ? { ...doc, body: value } : doc
      );
    });
  };

  const handleLanguageChange = (lang, index) => {
    setSelectedLanguage(lang);
    setLangIndex(index);
    setSelectedLanguageIndex(index);
    setFormData((prev) => ({
      ...prev,
      additionalNotes: openEditModule?.body[index].body,
    }));
  };

  return (
    <div className="p-6 flex flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6 h-full relative">
      <div className="flex w-full items-center justify-between gap-12">
        {/* Category Input */}
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Type{" "}
          </label>
          <div className="mt-1 h-[2.25rem] px-2 border border-[#8891AA] bg-[#F4F4F6] rounded-md flex items-center justify-start">
            <p className="text-sm text-[#121C2D] capitalize font-medium">
              {types.find((item) => item.serverName === formData.type).name}
            </p>
          </div>
        </div>

        {/* name */}
        <div className="flex flex-col w-1/2">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            Name{" "}
          </label>
          <input
            type="text"
            value={formData.name}
            placeholder="Placeholder"
            className="mt-1 h-[2.25rem] text-sm font-medium px-2 border capitalize border-[#8891AA] placeholder:italic focus:outline-none rounded-md classic"
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                handleInputChange("name", value);
              }
            }}
          />
        </div>
      </div>

      {/* Languages Dropdown */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            {"Language(s)"}{" "}
          </label>
          <div className="mt-1 w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
            <div
              className={`w-full h-full relative gap-1 flex items-center justify-between`}
            >
              <div className="px-3 flex items-center justify-start gap-1 h-full py-1">
                {language?.map((lang, index) => (
                  <div
                    key={index}
                    className="flex capitalize text-sm items-center text-nowrap gap-2 px-2 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                  >
                    {lang}

                    {lang.toLowerCase() !== "english" && (
                      <button
                        onClick={() => removeLanguage(lang)}
                        className="text-[#606B85] hover:text-blue-900 focus:outline-none"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-full aspect-square flex items-center justify-center">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center justify-center w-5 h-5 aspect-square"
                >
                  <img
                    src={chevronDown}
                    className={`w-full h-full object-contain transition-all ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    alt="chevron down"
                  />
                </button>
              </div>
            </div>
            {showDropdown && dropDownList.length > 0 && (
              <div className="w-[calc(100%+2px)] h-fit absolute top-[calc(100%+1px)] left-[-1px] shadow-2xl rounded-md bg-white z-50 flex flex-col items-start justify-start px-2">
                {dropDownList
                  .filter((lang) => !language.includes(lang))
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleDropDownClick(item)}
                      className="py-2 w-full flex items-center justify-start border-b border-[#8891AA] last:border-b-0"
                    >
                      <p className="capitalize text-sm">{item}</p>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-12">
        {dropDownListStatic.length > 1 && (
          <div className="flex items-center justify-between gap-12">
            <div className="flex flex-col">
              <label className="font-medium text-nowrap text-[#121C2D] flex items-center gap-1 text-sm">
                <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
                Select language to view{" "}
              </label>
              <div className="flex mt-1 h-[2.25rem]">
                {dropDownListStatic?.map((lang, id) => (
                  <button
                    key={id}
                    className={`h-full px-4 border first:border-r-[0.5px] last:border-l-[0.5px] capitalize ${
                      selectedLanguage === lang
                        ? "bg-[#F4F9FF] border-[#006DFA] first:border-r-[#8891AA] last:border-l-[#8891AA] text-[#006DFA]"
                        : "border-[#8891AA] text-[#121C2D] first:rounded-l-md last:rounded-r-md"
                    }`}
                    onClick={() => handleLanguageChange(lang, id)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <ActiveButtons active={active} setActive={setActive} />
      </div>

      {/* Rich Text Editor */}
      {/* {documents.map((doc, index) => (
        <div
          key={index}
          className={`w-full flex-col 
           ${index === langIndex ? "flex" : "hidden"}
          `}
        > */}
          <Syncfusion
            value={documents[langIndex].body}
            index={langIndex}
            onChangeFunction={handleQuillChange}
          />
        {/* </div>
      ))} */}

      {/* Submit Button */}
      <div className="w-fit h-fit absolute bottom-8 right-6">
        <BlueButton
          text={"Save"}
          onClickHandler={handleSubmit}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EditDocumentTemplate;

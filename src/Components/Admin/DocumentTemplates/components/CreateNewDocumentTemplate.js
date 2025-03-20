import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useAppContext } from "../../../../utils/AppContext";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";
import { useAlertContext } from "../../../../utils/AlertContext";
import chevronDown from "../../../../Assets/icons/chevronDown.png";
import Syncfusion from "../../../../ui/Syncfusion";
// import { translateToHindi } from "../../../../utils/translateToHindi";

const CreateNewDocumentTemplate = ({ types, fetchData, selectedType }) => {
  const dropDownList = [ "english", "hindi" ];

  const { setAlert } = useAlertContext();
  const { selectedBranch } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    type: selectedType,
    additionalNotes: "",
  });

  const [languages, setLanguages] = useState(["english"]); // Initial languages
  // const [translation, setTranslation ] = useState()
  const [documents, setDocuments] = useState([
    {
      language: "english",
      body: "",
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const removeLanguage = (langToRemove) => {
    setLanguages(languages.filter((lang) => lang !== langToRemove));

    setDocuments((prev) =>
      prev.filter((item) => item.language !== langToRemove)
    );
  };

  useEffect(() => {
    if (
      formData.type === "" ||
      formData.name === "" ||
      documents[0].body === "" ||
      languages.length === 0
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, languages, documents]);

  const handleDropDownClick = (value) => {
    setLanguages((prev) => [...prev, value]);
    setDocuments((prev) => [
      ...prev,
      {
        language: value,
        body: "",
      },
    ]);
  };

  // useEffect(() => {
  //   if (documents[0].body !== "") {
  //     const text  = translateToHindi(documents[0].body)
      
  //     console.log(text)
  //   }
  // }, [documents])

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // const translateToHindi = async (text) => {
  //   const apiKey = process.env.REACT_APP_TRANSLATE_API_KEY; // Replace with your API key
  //   const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         q: text,
  //         source: "en",
  //         target: "hi",
  //         format: "text",
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     const convertedString = data.data.translations[0].translatedText || ""
  //     if (typeof convertedString === "string") {
  //       setTranslation(convertedString)
  //       console.log(convertedString)
  //     }
  //   } catch (error) {
  //     console.error("Translation API error:", error);
  //     return "";
  //   }
  // };

  const handleSubmit = () => {
    
    const sendData = {
      type: formData.type,
      name: formData.name,
      body: documents,
      businessBranchId: selectedBranch.id,
    };

    axiosInstance
      .post("/api/v1/document-templates", sendData)
      .then((res) => {
        console.log(res);
        setAlert("Added Successfully");
        fetchData();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const handleQuillChange = (value) => {
    setDocuments((prev) => {
      return prev.map((doc, index) =>
        index === 0 ? { ...doc, body: value } : doc
      );
    });
  };

  return (
    <div className="p-6 flex flex-col justify-start items-end mx-auto bg-white rounded-md space-y-6 h-full relative">
      <div className="flex w-full items-center justify-between gap-[50px]">
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

      {/* languages */}
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
                {languages?.map((lang, index) => (
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
                  .filter((lang) => !languages.includes(lang))
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

      {/* Rich Text Editor */}
      <div className="w-full flex flex-col">
        {/* <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm"><div className="w-1 aspect-square rounded-full bg-red-500"></div> Category </label> */}
        <Syncfusion
          value={documents[0].body}
          // index={index}
          onChangeFunction={handleQuillChange}
        />
      </div>

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

export default CreateNewDocumentTemplate;

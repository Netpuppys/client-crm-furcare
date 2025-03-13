import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // React Quill styles
import ReactQuill from "react-quill";
import axiosInstance from "../../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import BlueButton from "../../../../ui/BlueButton";
import { useAlertContext } from "../../../../utils/AlertContext";
import ActiveButtons from "../../../../ui/ActiveButtons";

const EditDocumentTemplate = ({ types, fetchData, openEditModule }) => {
  const { setAlert } = useAlertContext();

  const [formData, setFormData] = useState({
    type: openEditModule?.type,
    name: openEditModule?.name,
  });

  const [language, setLanguage] = useState([]); // Initial language
  const [documents, setDocuments] = useState(openEditModule.body);
  const [inputValue, setInputValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [dropDownListStatic, setDropDownListStatic] = useState();
  const [disabled, setDisabled] = useState(true);
  const [dropDownList, setDropDownList] = useState(dropDownListStatic);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [active, setActive] = useState(openEditModule.active);

  // set static languages
  useEffect(() => {
    const langArr = openEditModule.body.map((item) => item.language);

    setDropDownListStatic(langArr);
    setSelectedLanguage(langArr[0]);
  }, [openEditModule]);

  // filter dropdown list
  useEffect(() => {
    if (inputValue) {
      const data = dropDownListStatic.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      const finalData = data.filter((item) => !language.includes(item));
      setDropDownList(finalData);
    } else {
      setDropDownList([]);
    }
  }, [inputValue, language, dropDownListStatic]);

  // set languages
  useEffect(() => {
    if (openEditModule.body) {
      const newArr = openEditModule.body.map((item) => item.language);
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
    setInputValue("");
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // // Validation logic
    // if (!formData.type || !formData.name || !formData.additionalNotes || language.length===0) {
    //     toast.error("Please fill all required fields.");
    //   return;
    // }

    // const bodyContent = language.map((item) => ({
    //   language: item,
    //   body: formData.additionalNotes
    // }))

    const sendData = {
      type: formData.type,
      name: formData.name,
      body: documents,
      active: active,
    };

    axiosInstance
      .patch(`/api/v1/document-templates/${openEditModule.id}`, sendData)
      .then((res) => {
        console.log(res);
        setAlert("Changed Successfully");
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
        index === langIndex ? { ...doc, body: value } : doc
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
          <select
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="mt-1 p-2 border border-[#8891AA] focus:outline-none rounded-md classic"
          >
            <option value={""}>Select</option>
            {types.map((type, id) => (
              <option value={type.serverName} key={id}>
                {type.name}
              </option>
            ))}
          </select>
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
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1 p-2 border capitalize border-[#8891AA] placeholder:italic focus:outline-none rounded-md classic"
          />
        </div>
      </div>
      {console.log(documents)}

      {/* Languages Dropdown */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>{" "}
            {"Language(s)"}{" "}
          </label>
          <div className="mt-1 w-full relative gap-2 h-fit border border-[#8891AA] focus:outline-none rounded-md overflow-hidden">
            <div
              className={`w-full relative gap-2 flex p-2 ${
                inputFocus && dropDownList.length > 0 ? "border-b" : ""
              } border-[#8891AA] focus:outline-none`}
            >
              {language?.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center text-nowrap gap-2 capitalize px-3 py-1 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                >
                  {role}
                  <button
                    onClick={() => removeLanguage(role)}
                    className="text-[#606B85] hover:text-blue-900 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setInputFocus(false);
                  }, 100)
                }
                className="flex-grow w-full border-none focus:ring-0 focus:outline-none text-sm"
              />
            </div>

            {inputFocus && (
              <div className="w-full h-fit bg-white flex flex-col items-start px-2">
                {dropDownList.map((item, index) => (
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
        {documents.length > 1 && (
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
      <div className="w-full flex flex-col">
        <ReactQuill
          className="mt-2 h-[400px] mb-12"
          theme="snow"
          value={documents[langIndex]?.body}
          onChange={(value) => handleQuillChange(value)}
          placeholder="Placeholder"
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

export default EditDocumentTemplate;

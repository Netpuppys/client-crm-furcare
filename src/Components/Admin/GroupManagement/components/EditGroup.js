import { useEffect, useState } from "react";
import { useAppContext } from "../../../../utils/AppContext";
import axiosInstance from "../../../../utils/AxiosInstance";
import errorIcon from "../../../../Assets/icons/errorIcon.svg";
import BlueButton from "../../../../ui/BlueButton";
import { IoClose } from "react-icons/io5";
import { useAlertContext } from "../../../../utils/AlertContext";
import chevronDown from "../../../../Assets/icons/chevronDown.png";
import ActiveButtons from "../../../../ui/ActiveButtons";

const EditGroup = ({ editGroup, groupData, setGroupData, setEditGroup }) => {
  const { setAlert } = useAlertContext();
  const { selectedBranch } = useAppContext();

  const [selectedResources, setSelectedResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [initialResources, setInitialResources] = useState([]);
  const [dropDownList, setDropDownList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [active, setActive] = useState(editGroup.active);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: editGroup.name,
    description: editGroup.description,
  });

  useEffect(() => {
    const filtered = resources.filter((item) =>
      editGroup.resources.some((resource) => resource.staffId === item.id)
    );

    setSelectedResources(filtered);
    setInitialResources(filtered);
  }, [editGroup, resources]);

  // show error if name is already present
  useEffect(() => {
    if (
      formData.name.replace(/\s/g, "") !== editGroup.name.replace(/\s/g, "") &&
      groupData.some(
        (item) =>
          item.name.toLowerCase().replace(/\s/g, "") ===
          formData.name.toLowerCase().replace(/\s/g, "")
      )
    ) {
      setShowError(true);
      return;
    }

    setShowError(false);
  }, [formData, groupData, editGroup]);

  // fetch all the staff
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/staff?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;

        const filtered = response.filter((item) => item.active === true);

        setResources(filtered);
        setDropDownList(filtered);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedBranch]);

  // filter out selected staff members from dropdown
  useEffect(() => {
    // if (selectedResources.length>0) {
    const filtered = resources.filter((item) =>
      selectedResources.every((staff) => staff.id !== item.id)
    );

    setDropDownList(filtered.filter((item) => item.active === true));
    return;
    // }
  }, [selectedResources, resources]);

  // filter out staff memebers according to input value
  useEffect(() => {
    if (inputValue !== "") {
      const filterred = resources.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setDropDownList(filterred);
      return;
    }

    setDropDownList(resources);
  }, [inputValue, resources]);

  // drop down click function
  const handleDropDownClick = (value) => {
    setSelectedResources((prev) => [...prev, value]);

    setInputValue("");
  };

  // remove staff member from selected resources
  const removeRole = (roleToRemove) => {
    setSelectedResources((prev) =>
      prev.filter((role) => role.id !== roleToRemove)
    );
  };

  // check the inputs for enabling or disabling the button
  useEffect(() => {
    if (
      formData.name.replace(/\s/g, "") === "" ||
      formData.description.replace(/\s/g, "") === "" ||
      !selectedResources.length > 0 ||
      groupData.some(
        (item) =>
          item.name.toLowerCase().replace(/\s/g, "") ===
          formData.name.toLowerCase().replace(/\s/g, "")
      )
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, selectedResources, groupData, initialResources]);

  useEffect(() => {
    if (
      formData.name.replace(/\s/g, "") === editGroup.name.replace(/\s/g, "") &&
      formData.description.replace(/\s/g, "") ===
        editGroup.description.replace(/\s/g, "") &&
      JSON.stringify(selectedResources) === JSON.stringify(initialResources) &&
      active === editGroup.active
    ) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  }, [formData, selectedResources, initialResources, active, editGroup]);

  // function to handle input values in form data
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleTextAreaChange = (value) => {
    // Allow alphabets, numbers, and special characters only if they are mixed with text
    const regex = /[a-zA-Z0-9]/; // Ensure at least one letter or number is present

    if (regex.test(value) || value === "") {
      setFormData((prev) => ({ ...prev, description: value }));
    }
  };
  // function fetch table data when a new group is created
  const refreshList = () => {
    axiosInstance
      .get(`/api/v1/groups?businessBranchId=${selectedBranch.id}`)
      .then((res) => {
        const response = res.data.data.data;
        setGroupData(response);
        setEditGroup(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle submit function
  const handleSubmit = () => {
    let removeResources = [];
    let addResources = [];

    const sendResources = selectedResources.map((resource) => resource.id);
    const initialResourcesId = initialResources.map((resource) => resource.id);

    removeResources = initialResourcesId.filter(
      (id) => !sendResources.includes(id)
    );

    // Find resources to add (present in sendResources but not in initialResources)
    addResources = sendResources.filter(
      (id) => !initialResourcesId.includes(id)
    );

    const data = {
      name: formData.name,
      description: formData.description,
      businessBranchId: selectedBranch.id,
      // resources: sendResources,
      active: active,
    };

    if (
      formData.name !== editGroup.name ||
      formData.description !== editGroup.description ||
      active !== editGroup.active
    ) {
      axiosInstance
        .patch(`/api/v1/groups/${editGroup.id}`, data)
        .then((res) => {
          console.log(res);
          setAlert("Group Updated Successfully");
          refreshList();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (addResources.length > 0) {
      const sendData = {
        staffIds: addResources,
      };

      axiosInstance
        .post(`/api/v1/groups/${editGroup.id}/resources`, sendData)
        .then((res) => {
          console.log(res);
          setAlert("Group Updated Successfully");
          refreshList();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (removeResources.length > 0) {
      const sendData = {
        staffIds: removeResources,
      };

      axiosInstance
        .delete(`/api/v1/groups/${editGroup.id}/resources`, { data: sendData })
        .then((res) => {
          console.log(res);
          setAlert("Group Updated Successfully");
          refreshList();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="p-6 flex h-full flex-col justify-start items-start mx-auto bg-white rounded-md space-y-6">
      <div className="flex gap-10 w-full">
        {/* Name Input */}
        <div className="flex flex-col w-3/5">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Name{" "}
          </label>
          <input
            type="text"
            className={`mt-1 p-2 placeholder:italic capitalize text-sm border ${
              showError ? "border-[#C72323]" : "border-[#8891AA]"
            } focus:outline-none rounded-md`}
            placeholder="Placeholder"
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                handleInputChange("name", value);
              }
            }}
          />

          {showError && (
            <div className="flex items-center justify-start gap-1 mt-2">
              <img src={errorIcon} className="" alt="" />
              <p className="text-sm text-[#C72323]">
                The group name is already in use.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-10 w-full">
        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
            <div className="w-1 aspect-square rounded-full bg-red-500"></div>
            Resources{" "}
          </label>

          <div className="mt-1 w-full h-[2.25rem] border border-[#8891AA] bg-white relative rounded-md">
            <div
              className={`w-full h-full relative gap-1 flex items-center justify-between`}
            >
              <div className="px-2 flex items-center justify-start gap-1 h-full py-1">
                {selectedResources.length === 0 && (
                  <p className="text-sm">Select</p>
                )}

                {selectedResources.length > 0 &&
                  selectedResources?.map((staff, index) => (
                    <div
                      key={index}
                      className="flex mx-1 h-full items-center text-nowrap gap-2 px-2 bg-[#F4F9FF] text-[#121C2D] border border-[#CCE4FF] rounded-full"
                    >
                      {staff.name}
                      <button
                        onClick={() => removeRole(staff.id)}
                        className="text-[#606B85] text-lg"
                      >
                        <IoClose />
                      </button>
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

            {showDropdown && (
              <div className="w-[calc(100%+2px)] h-fit absolute top-[calc(100%+1px)] left-[-1px] shadow-2xl rounded-md bg-white flex flex-col items-start px-2">
                {dropDownList.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleDropDownClick(item)}
                    className="h-10 w-full flex items-center justify-start border-b border-[#8891AA] last:border-b-0"
                  >
                    <p className="capitalize text-sm">{item.name}</p>
                  </button>
                ))}
                {dropDownList.length === 0 &&
                  selectedResources.length === 0 && (
                    <div className="h-10 w-full flex items-center justify-center border-b border-[#8891AA] last:border-b-0">
                      <p className="capitalize text-sm font-medium">
                        No Active Staff Found
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <label className="font-medium text-[#121C2D] flex items-center gap-1 text-sm">
          Description{" "}
        </label>
        <textarea
          type="text"
          className="mt-1 p-2 text-sm capitalize border placeholder:italic w-full h-20 border-[#8891AA] focus:outline-none rounded-md"
          placeholder="Field text"
          value={formData.description}
          onChange={(e) => handleTextAreaChange(e.target.value)}
          maxLength={50}
        />
        <p className="text-[#606B85] text-sm mt-2">Max 50 chars</p>
      </div>

      <ActiveButtons active={active} setActive={setActive} />

      {/* Submit Button */}
      <div className="h-full w-full items-end flex justify-end ">
        <BlueButton
          disabled={disabled}
          onClickHandler={handleSubmit}
          text={"Save"}
        />
      </div>
    </div>
  );
};

export default EditGroup;

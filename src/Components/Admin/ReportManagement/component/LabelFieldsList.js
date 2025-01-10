import { IoClose } from "react-icons/io5"
import BlueButton from "../../../../ui/BlueButton"
import popoverBeak from "../../../../Assets/icons/popoverBeak.png"

const LabelFieldsList = ({ selectedGroup, setShowLabelsList, setSelectedGroup, selectedGroupData, setEditGroup }) => {
    
    const handleClose = () => {
        setSelectedGroup(null)
        setShowLabelsList(null)
    }

    const handleEdit = () => {
        setEditGroup(selectedGroupData)
        setSelectedGroup(null)
        setShowLabelsList(null)
    }

    return (
        <div className="relative w-80 h-fit p-6 bg-white border border-[#E1E3EA] rounded-lg">
            <img 
                src={popoverBeak}
                className="absolute bottom-full left-3"
                alt=""
            />
            <button 
                onClick={handleClose}
                className="absolute top-2 right-2 text-[#606B85] text-xl"
            >
                <IoClose />
            </button>
            <p className="text-[#121C2D] font-semibold pb-2">
                Label Fields
            </p>
            <div className="pb-6 flex flex-col items-start justify-start gap-[2px]">
                {selectedGroup.map((item, index) => (
                    <p 
                        key={index}
                        className="text-[#121C2D] text-sm capitalize"
                    >
                        {item}
                    </p>
                ))}
            </div>
            <BlueButton
                text={"Edit"}
                onClickHandler={handleEdit}
            />
        </div>
    )
}

export default LabelFieldsList;
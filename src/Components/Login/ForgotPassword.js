import { useState } from "react";
import BlueButton from "../../ui/BlueButton";
import placeholderLogo from "../../Assets/Login/placeholderLogo.png"

const ForgotPassword = ({ setForgotPassword }) => {
    const [ mobileNumber, setMobileNumber ] = useState("")
    const [ codeSent, setCodeSent ] = useState(false)

    const maskedMobileNumber =
        mobileNumber.length === 10
            ? `xxxxxx${mobileNumber.slice(6)}`
            : mobileNumber;

    const sentmessage = <>
        A temporary password has been sent to your mobile {maskedMobileNumber}. Try logging in again using the new password.
    </>

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and limit the length to 10
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNumber(value);
        }
    };

    const handleSend = () => {
        setCodeSent(true)
    }

    return (
        <div className='max-w-[27rem] w-full flex flex-col items-center justify-start'>
            <div className='w-[7.125rem] h-[9.9375rem] mb-[2.8rem]'>
                <img
                    src={placeholderLogo}
                    className='w-full h-full'
                    alt=''
                />
            </div>
            <p className='text-center text-[#121C2D] text-sm leading-[1.25rem]'>
                {codeSent? sentmessage : "Enter you registered mobile number to receive a temporary password to login."}
            </p>
            {!codeSent &&
            <div className='max-w-80 w-full flex flex-col items-center justify-start'>
                <input
                    type="tel"
                    placeholder="Mobile number"
                    className="h-10 p-2 focus:outline-none my-6 w-full border-2 border-[#8891AA] bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm"
                    value={mobileNumber}
                    onChange={handleInputChange}
                />
                <div className='flex gap-5'>
                    <button
                        onClick={() => setForgotPassword(false)}
                        className='px-4 py-2 text-text-black bg-transparent border-2 border-[#CACDD8] rounded-lg font-semibold leading-[1.25rem] text-sm'
                    >
                        Back to login
                    </button>
                    <BlueButton
                        text={'Send'}
                        disabled={mobileNumber?.length !== 10}
                        onClickHandler={handleSend}
                    />
                </div>
            </div>}

            {codeSent &&
            <button
                onClick={() => setForgotPassword(false)}
                className='px-4 py-2 mt-6 text-text-black bg-transparent border-2 border-[#CACDD8] rounded-lg font-semibold leading-[1.25rem] text-sm'
            >
                Back to login
            </button>}
        </div>
    )
}

export default ForgotPassword;
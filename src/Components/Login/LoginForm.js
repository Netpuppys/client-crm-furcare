import React, { useState } from 'react'
import BlueButton from '../../ui/BlueButton'
import placeholderLogo from "../../Assets/Login/placeholderLogo.png"
import errorIcon from "../../Assets/icons/errorIcon.svg"
import ForgotPassword from "./ForgotPassword"
import axiosInstance from '../../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate()

    const [ showPassword, setShowPassword ] = useState(false)
    const [ loginViaOtp, setLoginViaOtp ] = useState(false)
    const [ forgotPassword, setForgotPassword ] = useState(false)
    const [ errors, setErrors ] = useState("")
    const [ loginCredentials, setLoginCredentials ] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validate email and password
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8; // Example validation for password length
    };

    const isButtonDisabled =
        !isValidEmail(loginCredentials.email) ||
        !isValidPassword(loginCredentials.password);

    const handleSubmit = () => {
        if (!isValidEmail(loginCredentials.email)) {
            setErrors(["email"])
            return
        }
        
        if (!isValidPassword(loginCredentials.password)) {
            setErrors(["password"])
            return
        }
        
        axiosInstance
            .post("/api/v1/auth/login", loginCredentials)
            .then(res => {
                console.log(res)
                localStorage.setItem("access", res.data.data.token)
                navigate('/admin/business-units')
            })
            .catch(err => {
                console.error(err)
                if (err.response.data.message === "Invaild email") {
                    setErrors(["email"])
                    return
                } else if (err.response.data.message === "Invaild password") {
                    setErrors(["password"])
                    return
                }

                if (err.status===429) {
                    alert("Too many requests, Please try again later")
                }
            })

        setErrors("")
    }
    
  return (
    <div className='w-full min-h-[50vh] h-full md:min-h-full md:w-full my-auto md:mx-w-1/2 py-10 md:py-0 flex flex-col items-center justify-center'>
        {/* login form */}
        {!forgotPassword &&
        <div className='max-w-80 w-full flex flex-col items-center justify-start'>
            <div className='w-[7.125rem] h-[9.9375rem] mb-6 md:mb-[2.8rem]'>
                <img
                    src={placeholderLogo}
                    className='w-full h-full'
                    alt=''
                />
            </div>
            <input
                type='email'
                name='email'
                placeholder='User email'
                className={`${errors.includes("email")? "border-error-red mb-1" : "border-light-gray mb-4 md:mb-6"}
                    h-10 p-2 focus:outline-none w-full border-2 bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm`}
                value={loginCredentials.email}
                onChange={handleInput}
            />
            {errors.includes("email") &&
            <div className='flex w-full items-center justify-start gap-1 mb-6'>
                <img
                    src={errorIcon}
                    className=''
                    alt=''
                />
                <p className='text-error-red text-sm leading-[1.25rem]'>
                    Enter a valid email address
                </p>
            </div>}
            <input
                type={showPassword? 'text' : 'password'}
                placeholder='Password'
                name='password'
                className={`${errors.includes("password")? "border-error-red mb-1" : "border-light-gray mb-0"}
                    h-10 p-2 focus:outline-none w-full border-2 bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm`}
                value={loginCredentials.password}
                onChange={handleInput}
            />
            <div onClick={() => setShowPassword(false)} className='hidden'></div>
            {errors.includes("password") &&
            <div className='flex w-full items-center justify-start gap-1'>
                <img
                    src={errorIcon}
                    className=''
                    alt=''
                />
                <p className='text-error-red text-sm leading-[1.25rem]'>
                    Wrong password entered. 
                </p>
            </div>}
            <div className='w-full mb-4 md:mb-6'>
                <button 
                    onClick={() => setForgotPassword(true)}
                    className='text-accent-blue font-semibold text-[14px] text-left'
                >
                    Forgot password?
                </button>
            </div>

            {/* submit button */}
            <BlueButton
                text={"Log In"}
                disabled={isButtonDisabled}
                onClickHandler={handleSubmit}
            />

            <div className='w-full flex flex-nowrap mt-4 md:mt-6 items-center justify-center gap-[0.5rem]'>
                <div className='w-full h-[0.0625rem] bg-black'></div>
                <p className='text-xs w-full tracking-[0.00375rem] text-center px-0 text-[#121C2D] text-nowrap'>
                    Or Log In With
                </p>
                <div className='w-full h-[0.0625rem] bg-black'></div>
            </div>
            {!loginViaOtp && 
            <button
                onClick={() => setLoginViaOtp(true)}
                className='px-4 mt-4 md:mt-6 py-2 text-text-black bg-transparent border-2 border-[#CACDD8] rounded-lg font-semibold leading-[1.25rem] text-sm'
            >
                One Time Code
            </button>}
            {loginViaOtp && 
            <button
                onClick={() => setLoginViaOtp(true)}
                className='px-4 mt-4 md:mt-6 py-2 text-text-black bg-transparent border-2 border-[#CACDD8] rounded-lg font-semibold leading-[1.25rem] text-sm'
            >
                Resend Code
            </button>}
        </div>}

        {/* forgot password form */}
        {forgotPassword &&
        <ForgotPassword
            setForgotPassword={setForgotPassword}
        />}

        {/* login via code form */}
        {loginViaOtp && !forgotPassword &&
        <div className='max-w-[27rem] w-full pt-6 flex flex-col items-center justify-center gap-6'>
            <p className='text-center text-[#121C2D] px-2 text-sm leading-[1.25rem]'>
                We sent a one time code to your registered mobile xxxxxx2601. Please enter the code below to log in.
            </p>

            <div className='max-w-80 h-fit w-full flex items-center gap-4'>
                <input
                    type='text'
                    placeholder='Enter code'
                    className='h-10 p-2 focus:outline-none w-full border-2 border-light-gray bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm'
                />
                <BlueButton
                    text={"Log In"}
                />
            </div>
        </div>
        }
    </div>
  )
}

export default LoginForm
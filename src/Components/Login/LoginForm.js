import React, { useState } from 'react'
import BlueButton from '../../ui/BlueButton'

const LoginForm = () => {
    const [ showPassword, setShowPassword ] = useState(false)
    
  return (
    <div className='w-1/2 h-full flex items-center justify-center'>
        <div className='max-w-80 w-full flex flex-col items-center justify-start'>
            <div className='w-[7.125rem] h-[9.9375rem] bg-blue-300 mb-[2.8rem]'></div>
            <input
                type='text'
                placeholder='Username'
                className='h-10 p-2 focus:outline-none mb-6 w-full border-2 border-[#8891AA] bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm'
            />
            <input
                type={showPassword? 'text' : 'password'}
                placeholder='Password'
                className='h-10 p-2 focus:outline-none mb-6 w-full border-2 border-[#8891AA] bg-transparent rounded-md placeholder:text-[#121C2D] placeholder:font-medium placeholder:text-sm'
            />
            <BlueButton
                text={"Log In"}
                // onClickHandler={}
            />
            <div className='w-full flex flex-nowrap mt-6 items-center justify-center gap-[0.5rem]'>
                <div className='w-full h-[0.0625rem] bg-black'></div>
                <p className='text-xs w-full tracking-[0.00375rem] text-center px-0 text-[#121C2D] text-nowrap'>
                    Or Log In With
                </p>
                <div className='w-full h-[0.0625rem] bg-black'></div>
            </div>
            <button
                onClick={() => setShowPassword(false)} 
                className='px-4 mt-6 py-2 text-text-black bg-transparent border-2 border-[#CACDD8] rounded-lg font-semibold leading-[1.25rem] text-sm'
            >
                One Time Code
            </button>
        </div>
    </div>
  )
}

export default LoginForm
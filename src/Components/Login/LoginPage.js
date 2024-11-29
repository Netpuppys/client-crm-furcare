import React from 'react'
import loginpageLogo from "../../Assets/logo/loginPageLogo.png"
import LoginForm from './LoginForm'

const Hero = () => {
    return (
        <div className='w-full md:w-1/2 h-[30vh] md:h-full overflow-hidden bg-accent-indigo flex items-center justify-start flex-col relative'>
            <div className='w-full h-full aspect-square hero-image'></div>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-start gap-12 pb-6'>
                <img
                    src={loginpageLogo}
                    className='w-[60%] md:max-w-60 h-fit'
                    alt=''
                />
                <p className="text-white text-center font-medium leading-[1.25rem]">
                    Created By Tutelage Portal Private Limited
                </p>
            </div>
        </div>
    )
}

const LoginPage = () => {

  return (
    <div className='w-full min-h-screen md:h-screen overflow-auto flex flex-col md:flex-row items-center md:justify-center bg-white'>
        <Hero />
        <LoginForm />
    </div>
  )
}

export default LoginPage
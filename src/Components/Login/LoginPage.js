import React from 'react'
import loginpageLogo from "../../Assets/logo/loginPageLogo.png"
import LoginForm from './LoginForm'

const Hero = () => {
    return (
        <div className='w-1/2 h-full bg-accent-indigo flex items-center justify-start flex-col relative'>
            <div className='w-full aspect-square hero-image'></div>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-start gap-12 pb-6'>
                <img
                    src={loginpageLogo}
                    className='max-w-60'
                    alt=''
                />
                <p className="text-white font-medium leading-[1.25rem]">
                    Created By Tutelage Portal Private Limited
                </p>
            </div>
        </div>
    )
}

const LoginPage = () => {

  return (
    <div className='w-full h-screen min-h-[50rem] flex items-center justify-center bg-white'>
        <Hero />
        <LoginForm />
    </div>
  )
}

export default LoginPage
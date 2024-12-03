import React from 'react'
import loginHeroImage from "../../Assets/Login/loginHeroImage.png"
import LoginForm from './LoginForm'

const Hero = () => {

    return (
        <div className='w-full hidden md:block md:w-fit h-[50vh] md:min-w-[calc(100vh*3/4)] md:aspect-[3/4] md:h-full overflow-hidden bg-accent-indigo'>
            <img
                src={loginHeroImage}
                className='w-full h-full'
                alt=''
            />
        </div>
    )
}

const LoginPage = () => {

  return (
    <div className='w-full min-h-screen md:h-screen overflow-auto flex flex-col md:flex-row items-center md:justify-start bg-white'>
        <Hero />
        <LoginForm />
    </div>
  )
}

export default LoginPage
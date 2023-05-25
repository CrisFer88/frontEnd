import React from 'react'
import '../../styles/LoginPage.css'
import { LoginComp } from '../components/LoginComp'
import { Register } from '../components/Register'

export const LoginPage = ():JSX.Element => {
  return (
    <div className='container-X2-Col total--height'>
      
        <LoginComp />
        <Register/>
      
       </div>
  )
}

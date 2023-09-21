// import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backArrow from '../assets/backArrow.svg'
import '../styled/Header.scss'

import mainApp from '../assets/mainApp.svg'

function Header() {
  let navigate = useNavigate()

  // const [registrationActive, setRegistrationActive] = useState(false)
  // const [loginActive, setloginActive] = useState(false)

  const submitmainApp = (event: React.FormEvent) => {
    event.preventDefault()
    navigate('/')
  }
  const submitBackArrow = (event: React.FormEvent) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <div className='header'>
      <div className='wrapper'>
        <nav className='navigation'>
          <img
            src={mainApp}
            alt='Display card line'
            className='main-app-svg'
            onClick={submitmainApp}
          />
          <img
            src={backArrow}
            alt='Display card line'
            className='back-arrow-svg'
            onClick={submitBackArrow}
          />
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'active-link' : 'noactive-link'
            }
          >
            Просмотр
          </NavLink>
          <NavLink
            to='/aboutus'
            className={({ isActive }) =>
              isActive ? 'active-link' : 'noactive-link'
            }
          >
            Управление
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header

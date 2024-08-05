import React from 'react'
import './style.css'
import { NavLink, Outlet } from 'react-router-dom'
const LayoutDefault = () => {
  return (
    <>
      <header className='header'>
        <div className='header__logo'>
          <NavLink to='/'>QUIZ</NavLink>
        </div>
        <div className='header__cart'>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>

      <main className='main'>
        <Outlet />
      </main>

      <footer className='footer'>
        Copyright @ 2023
      </footer>

    </>
  )
}

export default LayoutDefault
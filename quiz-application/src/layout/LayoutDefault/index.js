import React from 'react'
import './style.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { deleteCookie, getCookie } from '../../helper/cookie';
const LayoutDefault = () => {
  const token = getCookie('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie('id')
    deleteCookie('fullName')
    deleteCookie('token')
    deleteCookie('email')
    navigate('/login')
  }
  return (
    <>
      <header className='header'>
        <div className='header__logo'>
          <NavLink to='/'>QUIZ</NavLink>
        </div>
        <div className='header__menu'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/topic'>Topic</NavLink>
          <NavLink to='/answers'>Answers</NavLink>
        </div>
        <div className='header__cart'>
          {token ? (
            <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
          ) : (
            <>
              <div className='authentication'>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
              </div>

            </>
          )}
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
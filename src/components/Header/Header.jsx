import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {Logo,Container} from '../index';
import LogoutBtn from './LogoutBtn';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: '/',
      active: true,
    },
    {
      name: "Login",
      url: '/login',
      active: !authStatus,
    },
    {
      name: "Signup",
      url: '/signup',
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: '/all-posts',
      active: authStatus,
    },
    {
      name: "Add Post",
      url: '/add-post',
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='70px' />
            </Link>
            <ul className='flex ml-auto'>
              {navItems.map((navitem) =>
                navitem.active ? (
                  <li key={navitem.name}>
                    <button onClick={() => navigate(navitem.url)} className='inline-block px-6 py-2 duration-100 hover:bg-blue-100 rounded-full'>{navitem.name}</button>
                  </li>
                ) : null
              )}
              {
                authStatus && (
                  <li><LogoutBtn /></li>
                )
              }
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header

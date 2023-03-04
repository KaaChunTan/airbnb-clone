import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import PlacesPage from './PlacesPage'

const AccountPage = () => {
  const {user, setUser, ready} = useContext(UserContext)
  const [redirect, setRedirect] = useState(null);
  let {subpage} = useParams();

  if(!ready) return 'Loading ...';

  if(ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }

  const linkClasses = (type=null) => {
    let classes = 'py-2 px-4 font-bold ';
    if(subpage === undefined) {
      subpage = 'profile';
    }
    if(subpage === type) {
      classes += 'bg-primary text-white rounded-full';
    }
    return classes;
  }

  const logout = async() => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-4 mb-8'>
        <Link to={'/account'} className={linkClasses('profile')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          My profile
        </Link>
        <Link to={'/account/bookings'} className={linkClasses('bookings')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          My bookings
        </Link>
        <Link to={'/account/places'} className={linkClasses('places')}>
          My accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto font-bold'>
          Logged in as {user.name} ({user.email})<br/>
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {
        subpage === 'places' && (
          <PlacesPage/>
        )
      }
    </div>
  )
}

export default AccountPage
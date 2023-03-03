import React from 'react'
import { useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

const AccountPage = () => {
  const {user, ready} = useContext(UserContext)
  let {subpage} = useParams();

  if(!ready) return 'Loading ...';

  if(ready && !user) {
    return <Navigate to={'/login'} />
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
    await axios.post('/logout')
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-4'>
        <Link to={'/account'} className={linkClasses('profile')}>My profile</Link>
        <Link to={'/account/bookings'} className={linkClasses('bookings')}>My bookings</Link>
        <Link to={'/account/places'} className={linkClasses('places')}>My accomodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto font-bold'>
          Logged in as {user.name} ({user.email})<br/>
          <button onclick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage
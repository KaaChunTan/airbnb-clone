import React from 'react'
import { Link } from 'react-router-dom'

const PlacesPage = () => {
  return (
    <div>
      <div className='text-center font-bold'>
        <Link 
          className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full'
          to={'/account/places/new'}
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add new place
        </Link>
      </div>
    </div>
  )
}

export default PlacesPage
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks';

const PlacesPage = () => {
  const {action} = useParams();
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState('')

  const inputHeader = (text) => {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  const inputDescription = (text) => {
    return (
      <p className='text-gray-500 text-sm'>{text}</p>
    )
  }

  const preInput = (header, desc) => {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(desc)}
      </div>
    )
  }

  const addPhotoLink = async(e) => {
    e.preventDefault();
    const {data: filename} = await axios.post('/upload-by-link', {
      link: photoLink
    })
    setAddedPhotos(prev => {
      return [...prev, filename];
    })
    setPhotoLink('');
  }
    
  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    console.log(data)
    axios.post('/upload', data, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(res => {
      const {data: filenames} = res;
      setAddedPhotos(prev => {
        return [...prev, ...filenames]
      })
    })
  }

  return (
    <div>
      { action !== 'new' && (
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
      )}
      { action == 'new' && (
        <div>
          <form>
            {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder='title, for example: My lovely apartment'
            />
            {preInput('Address', 'Address to this place')}
            <input 
              type="text"   
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              placeholder='address'
            />
            {preInput('Photos', 'more = better')}
            <div className='flex gap-2'>
              <input 
                type="text" 
                value={photoLink} 
                onChange={e => setPhotoLink(e.target.value)} 
                placeholder={'Add using a link ...jpg'}
              />
              <button 
                className='bg-gray-200 px-4 rounded-2xl'
                onClick={addPhotoLink}
                >
                Add&nbsp;photos
              </button>
            </div>
            <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg: grid-cols-6'>
              {addedPhotos.length > 0 && addedPhotos.map((link, ind) => (
                <div className="h-32 flex" key={ind}>
                  <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />
                </div>
              ))}
              <label className="cursor-pointer flex p-8 items-center gap-2 justify-center border bg-transparent rounded-2xl text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
              </label>
            </div>
            {preInput('Description', 'Description to this place')}
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)}
            />
            {preInput('Perks', 'Select all the perks of your place')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra info', 'House rules, etc')}
            <textarea 
              value={extraInfo} 
              onChange={e => setExtraInfo(e.target.value)}
            />
            {preInput('Check in & out time', 'Add check in and out time, remember to have some time window for cleaning the room between guests')}
            <h2 className="text-2xl mt-4"></h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2 ">
                <h3>Check in time</h3>
                <input 
                  type="text" 
                  value={checkIn} 
                  onChange={e => setCheckIn(e.target.value)} 
                  placeholder="14:00"
                  />
              </div><div className="mt-2 ">
                <h3>Check out time</h3>
                <input 
                  type="text" 
                  value={checkOut} 
                  onChange={e => 
                    setCheckOut(e.target.value)} 
                  placeholder="12:00"
                  />
              </div>

              <div className="mt-2 ">
                <h3>Max guests</h3>
                <input 
                  type="number" 
                  value={maxGuests} 
                  onChange={e => setMaxGuests(e.target.value)} 
                  placeholder="1"
                  />
              </div>
            </div>
            <div>
              <button className='primary my-4'>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacesPage
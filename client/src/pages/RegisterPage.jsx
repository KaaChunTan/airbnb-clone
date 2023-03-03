import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() { 

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (e) => {
    e.preventDefault();
    try{
      await axios.post('/register', {
        name, password, email
      })
    } catch(e){
      alert('Registration failed. Please try again!')
    }
  }

  return (
    <div className="mt-4 flex grow justify-around items-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-lg mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}/>
          <input type="text" placeholder="your.email.com" value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link to='/login' className="underline text-black">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
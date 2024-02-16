import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { backend_url } from '../utils/url'
import axios from "axios"

const Register = () => {
    const [formDetails,setFormDetails]=useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
        setFormDetails({...formDetails,[e.target.name]:e.target.value})
    }
    const  handleSubmit=async(e)=>{
        e.preventDefault();
        const res= await axios.post(`${backend_url}/register`,formDetails)
        console.log(res.data)
    }
    
    return (
        <main className="transmain">
            <div className="transcontainer">
    
            <h2>Register</h2>
            <form onSubmit={handleSubmit} >
                <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id='username' onChange={handleChange} required/>
                </div>
                <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id='password' onChange={handleChange} required/>
                </div>
                <div className="extra">
                </div>
               <div className="field">
                <button type='submit'>Submit</button>
                    <p>Already a User, <NavLink to="/login">Login</NavLink></p>
               </div>
            </form>
            </div>
        </main>
      )
}

export default Register
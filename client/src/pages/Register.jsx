import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { backend_url } from '../utils/url'
import axios from "axios"
import { useUser } from '../context/UserContext'
import Loader from '../components/Loader/Loader'


const Register = () => {
    const {loading,setLoading}= useUser()
    const navigate=useNavigate()
    const [formDetails,setFormDetails]=useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
        setFormDetails({...formDetails,[e.target.name]:e.target.value})
    }
    const  handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        const res= await axios.post(`${backend_url}/register`,formDetails)
        setFormDetails({
            username:"",
            password:""
        })
        setLoading(false)
        alert(res.data.message)
        navigate("/login")
    }
    
    return (
        <main className="transmain">
            <div className="transcontainer">
    
            <h2>Register</h2>
            { loading ? (
            <>
            <Loader/>
            </>)
            : (<form onSubmit={handleSubmit} >
                <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id='username' value={formDetails.username} onChange={handleChange} required/>
                </div>
                <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id='password' value={formDetails.password} onChange={handleChange} required/>
                </div>
                <div className="extra">
                </div>
               <div className="field">
                <button type='submit'>Submit</button>
                    <p>Already a User, <NavLink to="/login">Login</NavLink></p>
               </div>
            </form>)
            }
            </div>
        </main>
      )
}

export default Register
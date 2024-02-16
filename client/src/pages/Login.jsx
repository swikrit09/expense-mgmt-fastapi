import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../utils/url'
import Cookies from "js-cookie"
import { useUser } from '../context/UserContext'

const Login = () => {
    const navigate=useNavigate()
    const {user,loginUser} = useUser()
    
    if(user){
        navigate("/",{replace:true})
    }
    const [formDetails,setFormDetails]=useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
        setFormDetails({...formDetails,[e.target.name]:e.target.value})
    }
    const  handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res= await axios.post(`${backend_url}/login`,formDetails)
            // alert(res.data.token_type)
            if(res.data.token_type){
                alert("Login Successful")
                loginUser(res.data.access_token)
                // Cookies.set("token_expense",res.data.access_token)
                navigate("/")
            }else if(res.status>=400){
                alert(res.data.details)
            }
        } catch (error) {
            alert(error.response.data.detail)
        }
    }
    return (
        <main className="transmain">
            <div className="transcontainer">

                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username"  id="username" onChange={handleChange} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"  id="password" onChange={handleChange} required />
                    </div>
                    <div className="extra">
                    </div>
                    <div className="field">
                        <button type='submit'>Submit</button>
                        <p>Not a User, <NavLink to="/register">Register</NavLink></p>
                    </div>
                </form>
            </div>

        </main>
    )
}

export default Login
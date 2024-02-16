import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./styles.css"
import { useUser } from '../context/UserContext'
import logoutUser from '../utils/logoutUser'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, setUser } = useUser()
    useEffect(() => {
        // This function could fetch user data if needed, or simply react to changes in the user state.
        // For demonstration, we're logging to the console.
        console.log("User state changed:", user);

        // If there's a need to fetch user data on component mount or user state change, do it here.
        // For instance, you might want to verify the user's token with your backend.

    }, [user]);

    return (
        <>

            <nav>
                <NavLink to="/" className="logo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3YAYc823625OgPX6pKg7BNaboun1V0h97kf1Q7Ce6r6gbw0zfuYWcEeGz41suiehIDYg&usqp=CAU" alt="logo" />
                </NavLink>
                <div className="links">
                    <NavLink to="/addtransaction">
                        <p>Add Trasaction</p>
                    </NavLink>
                    <NavLink to="/details">
                        <p>Transaction Details</p>
                    </NavLink>
                    {
                        !user
                            ?
                            <NavLink to="login">
                                <p>Login</p>
                            </NavLink>
                            : <>
                                <div className="userdata">
                                    <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' title={user.username} alt='profile' />
                                    <p>{user.username}</p>
                                </div>
                                <button className="logoutbtn" onClick={() => logoutUser(navigate, setUser)}>Logout</button>
                            </>
                    }

                </div>
            </nav>
            <hr />
        </>
    )
}

export default Navbar
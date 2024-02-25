import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style.css"
import { useUser } from '../context/UserContext'

const Home = ({isHovering,setIsHovering}) => {
  const {user}=useUser()
  return (
    <main className='home-main'>
        <div className="left">
            <h1 className="head"
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            >Hello,{user ? ` ${user.username}` : `User`  } </h1>
            <p className="subhead">Welcome to The <br /> <span>Best Expense Tracker</span></p>
            <p className="para">We are the one stop solution inorder to manage your daily expenses, either you gain or spend tell us, we will keep you updated</p>
            <NavLink to ="/addtransaction" className="button mobile" >
                Add Transaction
            </NavLink>
            <NavLink to ="/details" className="button">
                Get My Records
            </NavLink>
        </div>
        <div className="right">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-4268366-3561009.png" alt="hero" />
        </div>
    </main>
  )
}

export default Home
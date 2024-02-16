import React from 'react'
import { backend_url } from "../utils/url.js"
import Cookies from "js-cookie"

const Transaction = () => {
  const [formDetails, setFormDetails] = React.useState({
    amount: 0,
    description: '',
    type: "income"
  })
  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token_expense');
    const res = await fetch(`${backend_url}/transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(formDetails)
      })
    const result=await res.json()
    console.log(result)
    alert(result.message);
    setFormDetails({
      amount: 0,
      description: '',
      type: "income"
    })
  }
  return (
    <main className="transmain">
      <div className="transcontainer">

        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input type="text" name="amount" required placeholder='Enter amount in ₹' onChange={handleChange} value={formDetails.amount}/>
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" placeholder='Describe the transaction...' onChange={handleChange} value={formDetails.description} />
          </div>
          <div className="field">
            <label htmlFor="income">Income</label>
            <input type="radio" name="type" id="income" value="income" onChange={handleChange} />
            <label htmlFor="expense">Expense</label>
            <input type="radio" name="type" id="expense" value="expense" onChange={handleChange} />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </main>
  )
}

export default Transaction
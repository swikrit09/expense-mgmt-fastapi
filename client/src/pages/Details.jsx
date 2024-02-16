import Cookies from "js-cookie";
import { useState,useEffect } from "react";
import { backend_url } from "../utils/url";

const Details = () => {
  const [data, setData] = useState({
    remainingAmt:"Fetching",
    incomeAmt:"Fetching",
    expenseAmt:"Fetching"
  });

  const token = Cookies.get('token_expense');
  const getData=async()=>{

    const options=    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    }
  const res1 = await fetch(`${backend_url}/remaining`,options)
  const remaining=await res1.json()
  const res2 = await fetch(`${backend_url}/expense`,options)
  const expense=await res2.json()
  const res3 = await fetch(`${backend_url}/income`,options)
  const income=await res3.json()
  setData({
    remainingAmt:remaining.remaining_amount,
    incomeAmt:income.total_income,
    expenseAmt:expense.total_expense
  })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <main className='transmain'>
      <div className="transcontainer">

        <h1>Remaining Amount: <span>₹ { data.remainingAmt}</span></h1>
        <h1>Total Income: <span>₹ {data.incomeAmt}</span></h1>
        <h1>Total Expense: <span>₹ {data.expenseAmt}</span></h1>

      </div>
    </main>
  )
}

export default Details
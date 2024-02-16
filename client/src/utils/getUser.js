import { backend_url } from "./url";
import Cookies from "js-cookie";

export const getUser = async () => {
    try {
        const token= Cookies.get("token_expense")
        console.log(token)
        if(!token){
            return false
        }
      const response = await fetch(`${backend_url}/userauth`, {
        method:"GET",
        headers: {
            "Authorization":`Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result)
       if(result.success){
        console.log(`Hello ${result?.data?.user?.username} `)

        return result?.data?.user
       }else{
        console.log(result.message)
        console.log("err ")
        return null
       }
      
    } catch (error) {
      console.error('Auth check failed', error);
      return false;
    }
  };
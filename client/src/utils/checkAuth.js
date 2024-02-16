import { active_url } from "./url";
import Cookies from "js-cookie";

// not used currently

export const checkAuth = async () => {
    try {
        const token= Cookies.get("accessToken")
        if(!token){
            return false
        }
      const response = await fetch(`${active_url}/user/auth`, {
        method:"GET",
        headers: {
            "Authorization":`Bearer ${token}`
        }
      });
    //   const {data} = await response.json()
    //   console.log(data.user)
      return response.ok;
    } catch (error) {
      console.error('Auth check failed', error);
      return false;
    }
  };
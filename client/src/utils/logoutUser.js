import Cookies from "js-cookie"


const logoutUser = async (navigate,setUser) => {
    const token = Cookies.get("accessToken");
        Cookies.remove("token_expense")
        setUser(null)
        alert("User Logged Out Successfully")
        navigate("/login",{replace: true})
    
}

export default logoutUser
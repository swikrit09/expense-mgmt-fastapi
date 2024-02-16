import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Transaction, Register, Details, Home } from "./pages/index.js"
import Navbar from './components/Navbar.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import { UserProvider } from "./context/UserContext.jsx"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/addtransaction' element={<Transaction />} />
              <Route path='/details' element={<Details />} />
            </Route>
            <Route path="/" element={<Home />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App

// todo 
// create a getuser route/middleware to check if user is logged in before rendering certain pages.
// create a protected route logic
// set the user in a context to get the details accessiblle to all the pages 


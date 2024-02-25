import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Transaction, Register, Details, Home } from "./pages/index.js"
import Navbar from './components/Navbar.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import { UserProvider } from "./context/UserContext.jsx"
import { useRef, useEffect ,useState} from 'react'

const App = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)
  const cursorOutlineRef = useRef(null)
  useEffect(() => {
    const moveCursor = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      // For the cursor that follows immediately
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x + 12}px, ${y + 12}px)`;
      }

      // For the animated cursor outline
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          transform: `translate(${x}px, ${y}px)`
        }, {
          duration: 500,
          fill: "forwards"
        });
      }
    };

    // Add event listener
    window.addEventListener("mousemove", moveCursor);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <>
      <main className='container'>
        <div className="cursor-outline" ref={cursorOutlineRef} ></div>
        <div className={`cursor ${isHovering?"hover" : ""}`} ref={cursorRef} ></div>
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
              <Route path="/" element={<Home isHovering={isHovering} setIsHovering={setIsHovering} />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App

// todo 
// create a getuser route/middleware to check if user is logged in before rendering certain pages.
// create a protected route logic
// set the user in a context to get the details accessiblle to all the pages 


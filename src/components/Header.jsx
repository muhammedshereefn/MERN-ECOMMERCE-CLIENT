import React from 'react'
import logo from '../assets/logooo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";


const Header = () => {
  const[isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()

  const redirectedToLoginPage = () => {
    navigate("/login")
  }
  


  return (
    <header className='h-auto lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center bg-white'>
       {
          !(isSearchPage && isMobile)&&(
            <div className='container mx-auto flex items-center  px- justify-between'>
            {/* Logo */}
            <div className='h-full'>
               <Link to={"/"} className='h-full flex justify-center items-center'>
                   <img src={logo} 
                   alt="Logo"
                    width={160}
                     height={80}
                     className='hidden lg:block'
                      />
   
                       <img src={logo}
                    alt="Logo"
                     width={100}
                      height={60}
                      className='lg:hidden'
                       />
               </Link>
           </div>
   
           {/* Search */}
               <div className='hidden lg:block'>
                  <Search/>
               </div>
   
           {/* login and my cart */}
               <div>
                   <button className='text-neutral-500 lg:hidden'>
                   <FaRegCircleUser size={26} />
                   </button>
                   <div className='hidden lg:flex  items-center gap-10'>
                        <button onClick={redirectedToLoginPage} className='text-lg px-2'>Login</button>
                        <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                          <div className='animate-bounce'>
                          <BsCart4 size={26}/>
                          </div>

                          <div className='font-semibold'>
                            {/* <p>1 items</p>
                            <p>total price</p> */}
                            My Cart
                          </div>
                        </button>
                   </div>
               </div>
          </div>
          )
       }

       <div className="container mx-auto px-2 py-2 lg:hidden">
        <Search /> {/* Moved this section into the bg-red-500 container */}
      </div>
    </header>
  )
}

export default Header


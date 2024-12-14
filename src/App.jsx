import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import {setUserDetails} from './store/userSlice'
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
    
  }


    useEffect(()=>{
      fetchUser()
    },[])


  return (
  <>
    <Header/>
    <main className='min-h-[78vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <ToastContainer/>
  </>
  )
}

export default App

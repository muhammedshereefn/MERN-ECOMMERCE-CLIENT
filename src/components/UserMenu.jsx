import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummuryApi'
import { logout } from '../store/userSlice'
import { toast } from 'react-toastify'
import AxiosToastError from '../utils/AxiosToastError'
import { LuExternalLink } from "react-icons/lu";

const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
  const dispatch  = useDispatch()
  const navigate = useNavigate()

    const handleLogout = async()=> {
      try {
        const response = await Axios({
          ...SummaryApi.logout
        })

        if(response.data.success) {
          if(close){
            close()
          }
          
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate('/')
          
        }
      } catch (error) {
        AxiosToastError(error)
      }
    }

    const handleClose = () => {
      if(close){
        close()
      }
    }
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'><LuExternalLink size={15} /></Link>
        </div>
      <Divider/>

      <div className='text-sm grid gap-1'>
        <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-100 py-1 rounded'>My Orders</Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-100 py-1 rounded'>Save Address</Link>
        <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-100 py-1 rounded'>Log Out</button>
      </div>
    </div>
  )
}

export default UserMenu

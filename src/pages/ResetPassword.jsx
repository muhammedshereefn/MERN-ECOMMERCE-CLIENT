import React, { useEffect, useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummuryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { toast } from 'react-toastify'
import Axios from '../utils/Axios'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)

    const validateValue = Object.values(data).every(el => el)

    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate('/')
        }
        if(location?.state?.email){
            setData((preve)=>{
                return {
                    ...preve,
                    email : location?.state?.email
                }
            })
        }
    },[])


    const handleChange =(e)=>{
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(data.newPassword !== data.confirmPassword){
            toast.error("New password and confirm password must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data : data
                
            })
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email : "",
                    newPassword : "",
                    confirmPassword : ""
                })
               
            }  
        } catch (error) {
            AxiosToastError(error)  
        }
    }

    
  return (
    <section className='w-full container mx-auto px-2'>
    <div className='bg-white  my-4 w-full max-w-lg mx-auto rounded p-7'>

    <p className='font-semibold text-lg mb-2'>Enter Your Password</p>

    <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

    <div className='grid gap-1'>
                <label htmlFor='newPassword'>New Password :</label>
               <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
               <input 
                type={showPassword ? "text" : "password"}
                id='newPassword'
                className='w-full outline-none rounded-md'
                name='newPassword'
                value={data.newPassword}
                onChange={handleChange}
                placeholder='Enter your New Password' />
                <div onClick={()=> setShowPassword(preve => !preve)} className='cursor-pointer'>
                    {
                        showPassword ? (
                            <FaRegEye/>
                        ) : (
                            <FaEyeSlash />
                        )
                    }
                </div>
               </div>
            
            </div>

            <div className='grid gap-1'>
                <label htmlFor='confirmPassword'>Confirm Password :</label>
               <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
               <input 
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className='w-full outline-none rounded-md'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter yourConfirm Password' />
                <div onClick={()=> setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                    {
                        showConfirmPassword ? (
                            <FaRegEye/>
                        ) : (
                            <FaEyeSlash />
                        )
                    }
                </div>
               </div>
            
            </div>
      



        <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold  my-3 tracking-wide`}>Change Password</button>
    </form>

    <p>
        Already have account? <Link to={"/login"} 
        className='font-semibold text-green-700 hover:text-green-800'
        >Login</Link>
    </p>
    </div>
  
</section>
  )
}

export default ResetPassword

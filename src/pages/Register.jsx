import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummuryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })



    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()


    const handleChange =(e)=>{
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const validateValue = Object.values(data).every(el => el)

    const handleSubmit = async(e)=> {
        e.preventDefault()

        if(data.password !== data.confirmPassword){
         
            toast.error("password and confirm password must be same")
            return
        }
        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
                
            })
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }  
        } catch (error) {
            AxiosToastError(error)  
        }
    }
    
  

    
  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white  my-4 w-full max-w-lg mx-auto rounded p-7'>

        <p>Welcome to Jackson Trades</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label htmlFor='name'>Name :</label>
                <input 
                type="text"
                id='name'
                autoFocus
                className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                name='name'
                value={data.name}
                onChange={handleChange}
                placeholder='Enter your name'/>
            </div>

            <div className='grid gap-1'>
                <label htmlFor='name'>Email :</label>
                <input 
                type="email"
                id='email'
                className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                name='email'
                value={data.email}
                onChange={handleChange} 
                placeholder='Enter your email'/>
            </div>

            <div className='grid gap-1'>
                <label htmlFor='name'>Password :</label>
               <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
               <input 
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none rounded-md'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password' />
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
                placeholder='Confirm Password' />
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


            <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }  text-white py-2 rounded font-semibold  my-3 tracking-wide`}>Register</button>
        </form>

        <p>
            Already have account ? <Link to={"/login"} 
            className='font-semibold text-green-700 hover:text-green-800'
            >Login</Link>
        </p>
        </div>
      
    </section>
  )
}

export default Register
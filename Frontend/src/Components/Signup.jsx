import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useAuth } from '../Context/Authprovider'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const Signup = () => {
    const {authUser,setAuthUser}=useAuth()
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password =watch("password")
const confirmpassword = watch("confirmpassword")
  const validatepasswordMatch =(value)=>{   
    return value===password ||"password do not match"
  }

  const onSubmit =async  (data) =>{
    const userInfo={
        username:data.username,
        email:data.email,
        password:data.password,
        confirmPassword:data.confirmPassword    
    }
     await axios.post("/api/user/signup",userInfo)
    .then((response)=>{
       
        if(response.data){
            toast.success("Sign up successful")
        }
        localStorage.setItem("chat user",JSON.stringify(response.data))
        setAuthUser(response.data)
    })
    
        
    .catch((error)=>{
        if(error.response){
            toast.error(error.response.data.error)
        }
    })
  }
    


    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center text-2xl font-semibold text-gray-300 mb-1 tracking-wide">
                        Chill <span className="text-green-400 font-bold">App</span>
                    </h1>
                    <h2 className="text-xl font-bold text-white mb-6">SignUp</h2>

                    {/* username */}
                    <label className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-3 gap-3 mb-4 focus-within:border-green-500 transition-colors">
                        <svg className="h-5 w-5 text-gray-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            type="text"
                            // required
                            placeholder="Username"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers or dash"
                            className="bg-transparent text-gray-300 placeholder-gray-500 text-sm outline-none w-full"
                            {...register("username", { required: true })}
                        />
                    </label>
                    {errors.username && <span className='text-white'>This field is required</span>}

                    {/* Email */}
                    <label className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-3 gap-3 mb-4 focus-within:border-green-500 transition-colors">
                        <svg className="h-5 w-5 text-gray-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            type="email"
                            placeholder="mail@site.com"
                            // required
                            className="bg-transparent text-gray-300 placeholder-gray-500 text-sm outline-none w-full"
                            {...register("email", { required: true })}
                        />
                    </label>
                    {errors.email && <span className='text-white'>This field is required</span>}

                    {/* Password */}
                    <label className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-3 gap-3 mb-4 focus-within:border-green-500 transition-colors">
                        <svg className="h-5 w-5 text-gray-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            // required
                            placeholder="Password"
                            // minLength="8"
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            className="bg-transparent text-gray-300 placeholder-gray-500 text-sm outline-none w-full"
                            {...register("password", { required: true })}

                        />
                    </label>
                    {errors.password && <span className='text-white'>This field is required</span>}

                    {/* Confirm Password */}
                    <label className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-3 gap-3 mb-6 focus-within:border-green-500 transition-colors">
                        <svg className="h-5 w-5 text-gray-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            // required
                            placeholder="Confirm Password"
                            // minLength="8"
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            className="bg-transparent text-gray-300 placeholder-gray-500 text-sm outline-none w-full"
                            {...register("confirmPassword", { required: true , validate:validatepasswordMatch})}

                        />
                    </label>
                    {errors.confirmPassword && <span className='text-red-700 font-semibold'>{
                        errors.confirmPassword.message}</span>}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                            Have an Account? <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Login</Link>
                        </p>
                        <input
                            type="submit"
                            value="Signup"
                            className="bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-6 py-2 rounded-lg cursor-pointer transition-colors"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup

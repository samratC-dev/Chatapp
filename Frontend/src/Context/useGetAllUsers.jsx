import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie'
import axios from 'axios'

const useGetAllUsers = () => {
    const [allUsers,setallUsers]=useState([])
    const [loading, setloading]=useState(false)
    useEffect(()=>{
        const getUsers= async()=>{
            setloading(true)
            try {
                const token=cookies.get("jwt")
                const response= await axios.get("/api/user/allusers",{
                    credentials:"include",
                    headers:{
                        Authorization:`bearer ${token}`
                    }
                })
                setallUsers(response.data)
                setloading(false)
            } catch (error){
                console.log("error in get all uers:"+error)
            } 
            
                
            }
        getUsers()
},[]) 
    
    return[allUsers,loading]
  
}

export default useGetAllUsers

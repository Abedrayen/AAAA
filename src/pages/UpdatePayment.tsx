import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfos } from '../API/ServerApi';
import { useAuth } from '../context/AuthContext';

function UpdatePayment() {

    const navigate=useNavigate()
    const [loadingPayment, setLoadingPayment] = useState(true)
    const { login } = useAuth(); // Get login function from context

    useEffect(()=>{
        const getUserNewData=async()=>{
            const response=await getUserInfos()
            console.log('response get User',response)
            login(response.user); // Assume response includes userName

            navigate("/")

        }
        getUserNewData()
       
    },[])
    if (loadingPayment) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500"></div>
            </div>
        );
    }
    return (
        <div>

        </div>
    )
}

export default UpdatePayment



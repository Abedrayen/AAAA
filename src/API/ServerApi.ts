import axios from "axios";
const baseUrlLocal="http://localhost:4000/api"
const baseUrlDeploy="https://footballback-1623.onrender.com/api" // "https://footballback.onrender.com/api" //https://footballback-1623.onrender.com
export const baseUrlServer= baseUrlDeploy //"http://localhost:4000/api"




//user routes
export const signupUser=async(data:any=undefined)=>{
  
    console.log('signupUser....',JSON.stringify(data))
    try {

      const response = await axios.post(baseUrlServer+"/users/register",data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response?.data
    } catch (error) {
      console.error('Error signupUser :', error); 
    }
  }

export const loginUser=async(data:any=undefined)=>{
  
    console.log('loginUser....',JSON.stringify(data))
    try {

      
      const response = await axios.post(baseUrlServer+"/users/login", data,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response loginUser',response.data)
      return response?.data
    } catch (error) {
      console.error('Error loginUser :', error); 
    }
  }


  export const sendOtp=async(data:any=undefined)=>{
  
    console.log('sendOtp....',JSON.stringify(data))
    try {

      
      const response = await axios.post(baseUrlServer+"/users/sendOtp", data,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response sendOtp',response.data)
      return response?.data
    } catch (error) {
      console.error('Error sendOtp :', error); 
    }
  }



  export const verifyOtp=async(data:any=undefined)=>{
  
    console.log('verifyOtp....',JSON.stringify(data))
    try {

      
      const response = await axios.post(baseUrlServer+"/users/checkOtp", data,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response verifyOtp',response.data)
      return response?.data
    } catch (error) {
      console.error('Error verifyOtp :', error); 
    }
  }


  

  export const getUserInfos=async(data:any=undefined)=>{
  
    console.log('getUser....',JSON.stringify(data))
    try {
  const access=localStorage.getItem('accessToken')
    const Authorization= `Bearer ${access}`
      
      const response = await axios.post(baseUrlServer+"/users/my-info", data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization:Authorization

        },
      });
      console.log('response getUser',response.data)
      return response?.data
    } catch (error) {
      console.error('Error getUser :', error); 
    }
  }



  export const getMyPredictions=async(data:any=undefined)=>{
  
    console.log('getMyPredictions....',JSON.stringify(data))
    try {
  const access=localStorage.getItem('accessToken')
    const Authorization= `Bearer ${access}`
      console.log('access',access)
      const response = await axios.get(baseUrlServer+"/bet/user-bets",{
        headers: {
          'Content-Type': 'application/json',
          Authorization:Authorization

        },
      });
      console.log('response getMyPredictions',response.data)
      return response?.data
    } catch (error) {
      console.error('Error getMyPredictions :', error); 
    }
  }

  
  export const createCheckoutSession=async(data:any=undefined)=>{
    const access=localStorage.getItem('accessToken')
    const Authorization= `Bearer ${access}`
    console.log('createCheckoutSession....',JSON.stringify(data))
    try {

      
      const response = await axios.post(baseUrlServer+"/users/createCheckoutSession", data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization:Authorization
        },
      });
      console.log('response createCheckoutSession',response.data)
      return response?.data
    } catch (error) {
      console.error('Error createCheckoutSession :', error); 
    }
  }

  export const createUserPrediction=async(data:any=undefined)=>{
    const access=localStorage.getItem('accessToken')
    const Authorization= `Bearer ${access}`
    console.log('createUserPrediction....',JSON.stringify(data))
    try {

      
      const response = await axios.post(baseUrlServer+"/bet/create", data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization:Authorization
        },
      });
      // console.log('response createUserPrediction',response.data)
      return response?.data
    } catch (error) {
      console.error('Error createUserPrediction :', error); 
    }
  }







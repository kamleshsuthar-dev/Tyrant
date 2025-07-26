import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utils/axios"
import { loadLogin, loadLoginError, loadLogout, loadLogoutError, loadRegister, loadRegisteredUser, loadRegisterError, loadUser } from "../reducer/authSlice";


// export const checkIsLogin = ()=> async(dispatch ,getState)=>{
//     try {
//         // console.log("current state" , getState());
//         const {data} = await axios.get("/auth/me") 
//         dispatch(loadUser(data))
//         console.log(data);
//     } catch (error) {
//         console.log(error.response.data);
//         dispatch(loadUser(error.response.data))
//     }
// }

export const checkIsLogin = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/auth/me");
        console.log("checkIsLogin success - Full response:", data);
        console.log("data.success:", data.success);
        console.log("data.user:", data.user);
        
        // Debug: Check current state before dispatch
        console.log("Current state before loadUser dispatch:", getState().auth);
        
        // Only dispatch if the request was successful
        if (data.success) {
            dispatch(loadUser(data));
        } else {
            // If success is false, treat as not logged in
            dispatch(loadUser({ success: false, user: {} }));
        }
        
        // Debug: Check state after dispatch
        setTimeout(() => {
            console.log("State after loadUser dispatch:", getState().auth);
        }, 100);
        
    } catch (error) {
        console.log("checkIsLogin error:", error.response?.data);
        // On error, set user as not logged in
        dispatch(loadUser({ success: false, user: {} }));
    }
}

export const checkIsRegistered = (email)=> async(dispatch ,getState)=>{
    console.log(email,"gfgfg");
    
    try {
        // console.log("current state" , getState());
        const {data} = await axios.get(`/auth/isregistered?email=${email}`) 
        console.log(data.isAlreadyRegistered);

        dispatch(loadRegisteredUser(data.isAlreadyRegistered))
    } catch (error) {
        console.log(error.response.data);
    }
}

export const loginUser = (data)=> async(dispatch ,getState)=>{
    console.log(email,"gfgfg");
         try {
            const response = await axios.post(`auth/login`, data);
            console.log(response);
            dispatch(loadLogin(response.data))

        } catch (err) {
          console.log(err);
          if(err.response.data.error == "Password Incorrect"){
                dispatch(loadLoginError({success: "false" ,error: "Invalid Email And Password "}))
          }else{
               dispatch(loadLoginError(err.response.data))
          }
        }
        finally{
            setTimeout(()=>{
               dispatch(loadLoginError(""))
            },3000)
        }
}

export const registerUser = (data)=> async(dispatch ,getState)=>{
    
         try {
            const response = await axios.post(`auth/register`, data);
            console.log(response);
            dispatch(loadRegister(response.data))

        } catch (err) {
         console.log(err);
         
        dispatch(loadRegisterError(err.response.data))
        }
        finally{
            setTimeout(()=>{
               dispatch(loadRegisterError(""))
            },3000)
        }
}


export const logout = ()=> async(dispatch,getState)=>{
    try {
        let res =await axios.post("/auth/logout") 
        console.log(res.data);
         dispatch(loadLogout(res.data))
    } catch (error) {
        console.log(error);
         dispatch(loadLogoutError(error.response.data))
    }
}


export const forgotPassword = createAsyncThunk(
    '',
    async (itemId, { rejectWithValue }) => {
        try {
            console.log("shopping cart item:", itemId);
            const res = await axios.post(`/category/delelte-category/${itemId}`);
            // console.log(res.data);
            
            return { itemId, response: res.data.message };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to delete item'
            );
        }
    }
);


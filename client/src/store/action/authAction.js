import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utils/axios";

// Check if user is logged in
export const checkIsLogin = createAsyncThunk(
    'auth/checkIsLogin',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/auth/me");
            
            if (data.success) {
                return data;
            } else {
                return { success: false, user: {} };
            }
        } catch (error) {
            console.log("checkIsLogin error:", error.response?.data);
            // Return unsuccessful login state instead of rejecting
            return { success: false, user: {} };
        }
    }
);

// Check if user is registered
export const checkIsRegistered = createAsyncThunk(
    'auth/checkIsRegistered',
    async (email, { rejectWithValue }) => {
        try {
            console.log(email, "checking registration");
            const { data } = await axios.get(`/auth/isregistered?email=${email}`);
            console.log(data.isAlreadyRegistered);
            return data.isAlreadyRegistered;
        } catch (error) {
            console.log(error.response?.data);
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to check registration'
            );
        }
    }
);

// Login user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('auth/login', userData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            let errorMessage = error.response?.data;
            
            if (error.response?.data?.error === "Password Incorrect") {
                errorMessage = { success: false, error: "Invalid Email And Password" };
            }
            
            return rejectWithValue(errorMessage);
        }
    }
);

// Register user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('auth/register', userData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data || error.message || 'Registration failed'
            );
        }
    }
);

// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/logout");
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data || error.message || 'Logout failed'
            );
        }
    }
);

// Fixed forgot password thunk (was incomplete in original)
export const resetPassword = createAsyncThunk(
    '/auth/reset-password',
    async ({email,otp ,newPassword}, { rejectWithValue }) => {
        try {
             const payload = { email };
             if (otp) payload.otp = otp;
             if (newPassword) payload.newPassword = newPassword;

            // console.log("resert password for:", email);
            const res = await axios.post(`/auth/reset-password`, payload);
            console.log(res,"resetpasss");
            
            return res.data;
        } catch (error) {
            console.log("forgot password error:", error);
            return rejectWithValue(
                error?.response?.data?.error||error?.response?.data?.message || error.message || 'Failed to send reset email'
            );
        }
    }
);



// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../Utils/axios"
// import { loadLogin, loadLoginError, loadLogout, loadLogoutError, loadRegister, loadRegisteredUser, loadRegisterError, loadUser } from "../reducer/authSlice";


// export const checkIsLogin = () => async (dispatch, getState) => {
//     try {
//         const { data } = await axios.get("/auth/me");
      
//         console.log("Current state before loadUser dispatch:", getState().auth);
        
      
//         if (data.success) {
//             dispatch(loadUser(data));
//         } else {
          
//             dispatch(loadUser({ success: false, user: {} }));
//         }
//         setTimeout(() => {
//             console.log("State after loadUser dispatch:", getState().auth);
//         }, 100);
        
//     } catch (error) {
//         console.log("checkIsLogin error:", error.response?.data);
//         // On error, set user as not logged in
//         dispatch(loadUser({ success: false, user: {} }));
//     }
// }

// export const checkIsRegistered = (email)=> async(dispatch ,getState)=>{
//     console.log(email,"gfgfg");
    
//     try {
//         // console.log("current state" , getState());
//         const {data} = await axios.get(`/auth/isregistered?email=${email}`) 
//         console.log(data.isAlreadyRegistered);

//         dispatch(loadRegisteredUser(data.isAlreadyRegistered))
//     } catch (error) {
//         console.log(error.response.data);
//     }
// }

// export const loginUser = (data)=> async(dispatch ,getState)=>{
//     console.log(email,"gfgfg");
//          try {
//             const response = await axios.post(`auth/login`, data);
//             console.log(response);
//             dispatch(loadLogin(response.data))

//         } catch (err) {
//           console.log(err);
//           if(err.response.data.error == "Password Incorrect"){
//                 dispatch(loadLoginError({success: "false" ,error: "Invalid Email And Password "}))
//           }else{
//                dispatch(loadLoginError(err.response.data))
//           }
//         }
//         finally{
//             setTimeout(()=>{
//                dispatch(loadLoginError(""))
//             },3000)
//         }
// }

// export const registerUser = (data)=> async(dispatch ,getState)=>{
    
//          try {
//             const response = await axios.post(`auth/register`, data);
//             console.log(response);
//             dispatch(loadRegister(response.data))

//         } catch (err) {
//          console.log(err);
         
//         dispatch(loadRegisterError(err.response.data))
//         }
//         finally{
//             setTimeout(()=>{
//                dispatch(loadRegisterError(""))
//             },3000)
//         }
// }


// export const logout = ()=> async(dispatch,getState)=>{
//     try {
//         let res =await axios.post("/auth/logout") 
//         console.log(res.data);
//          dispatch(loadLogout(res.data))
//     } catch (error) {
//         console.log(error);
//          dispatch(loadLogoutError(error.response.data))
//     }
// }


// export const forgotPassword = createAsyncThunk(
//     '',
//     async (itemId, { rejectWithValue }) => {
//         try {
//             console.log("shopping cart item:", itemId);
//             const res = await axios.post(`/category/delelte-category/${itemId}`);
//             // console.log(res.data);
            
//             return { itemId, response: res.data.message };
//         } catch (error) {
//             console.log("shopping cart item error:", error);
//             return rejectWithValue(
//                 error.response?.data?.message || error.message || 'Failed to delete item'
//             );
//         }
//     }
// );


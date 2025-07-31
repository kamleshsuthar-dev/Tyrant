    import { createSlice } from "@reduxjs/toolkit";
import { checkIsLogin, checkIsRegistered, loginUser, registerUser, logout, resetPassword } from "../action/authAction";

const initialState = {
   
        userData: {},
        isLogin: false,
        isRegistered: false,
        checkLogin: {
            loading: false,
            error: null
        },
        checkRegistration: {
            loading: false,
            error: null
        },
        login: {
            response: {},
            error: {},
            loading: false
        },
        registers: {
            response: {},
            error: {},
            loading: false
        },
        logout: {
            response: null,
            error: null,
            loading: false
        },
        resetPassword: {
            response: null,
            error: null,
            loading: false
        },
      
    
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    //   resetAuthState: () => initialState, // ✅ FIXED

        clearLoginError: (state) => {
            state.login.error = {};
        },
        clearRegisterError: (state) => {
            state.registers.error = {};
        },
        clearLogoutError: (state) => {
            state.logout.error = null;
        },
        clearResetPassword: (state) => {
            state.resetPassword.error = null;
            state.resetPassword.response = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Check Login Cases
            .addCase(checkIsLogin.pending, (state) => {
                state.checkLogin.loading = true;
                state.checkLogin.error = null;
            })
            .addCase(checkIsLogin.fulfilled, (state, action) => {
                state.checkLogin.loading = false;
                state.isLogin = action.payload.success;
                state.userData = action.payload.user || {};
            })
            .addCase(checkIsLogin.rejected, (state, action) => {
                state.checkLogin.loading = false;
                state.checkLogin.error = action.payload;
                state.isLogin = false;
                state.userData = {};
            })

            // Check Registration Cases
            .addCase(checkIsRegistered.pending, (state) => {
                state.checkRegistration.loading = true;
                state.checkRegistration.error = null;
            })
            .addCase(checkIsRegistered.fulfilled, (state, action) => {
                state.checkRegistration.loading = false;
                state.isRegistered = action.payload;
            })
            .addCase(checkIsRegistered.rejected, (state, action) => {
                state.checkRegistration.loading = false;
                state.checkRegistration.error = action.payload;
            })

            // Login Cases
            .addCase(loginUser.pending, (state) => {
                state.login.loading = true;
                state.login.error = {};
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.login.loading = false;
                state.login.response = action.payload;
                state.login.error = {};
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.login.loading = false;
                state.login.error = action.payload;
            })

            // Register Cases
            .addCase(registerUser.pending, (state) => {
                state.registers.loading = true;
                state.registers.error = {};
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registers.loading = false;
                state.registers.response = action.payload;
                state.registers.error = {};
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registers.loading = false;
                state.registers.error = action.payload;
            })

            // Logout Cases
            .addCase(logout.pending, (state) => {
                state.logout.loading = true;
                state.logout.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.logout.loading = false;
                state.logout.response = action.payload;
                state.logout.error = null;
                
                // Reset user data on successful logout
                state.userData = {};
                state.isLogin = false;
                state.isRegistered = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.logout.loading = false;
                state.logout.error = action.payload;
            })

            // Forgot Password Cases
            .addCase(resetPassword.pending, (state) => {
                state.resetPassword.loading = true;
                state.resetPassword.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPassword.loading = false;
                state.resetPassword.response = action.payload;
                state.resetPassword.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPassword.loading = false;
                state.resetPassword.error = action.payload;
            });
    }
});

export const { resetAuthState, clearLoginError, clearRegisterError, clearLogoutError, clearResetPassword} = authSlice.actions;

export default authSlice.reducer;
    
    
    
    //     import { createSlice } from "@reduxjs/toolkit"
    // // import { logoutUser } from "../action/authAction";


    //     const initialState = {
    //         data: {
    //         userData: {},
    //         isLogin: false,
    //         isRegistered: false,
    //         login:{
    //             response :{},
    //             error: {}
    //         },
    //         registers:{
    //             response :{},
    //             error: {}
    //         },
    //         logout:{
    //             response :null,
    //             error: null
    //         },
    //         },
    //     }

    //     const authSlice = createSlice({
    //         name: "auth" ,
    //         initialState,
    //         reducers: {
    //             resetAuthState: () => {
    //                 return initialState; // This will reset everything to initial state
    //                 },
    //             loadUser: (state,action)=>{
    //                 state.data.isLogin = action.payload.success
    //                 state.data.userData = action.payload.user
    //             },
    //             loadRegisteredUser : (state,action)=>{
    //                 state.data.isRegistered = action.payload
    //             },
    //             loadLogin: (state, action)=>{
    //                 state.data.login.response= action.payload
    //             },
    //             loadLoginError: (state, action)=>{
    //                 state.data.login.error= action.payload
    //             },
    //             loadLogout: (state, action)=>{
    //                 state.data.logout.response= action.payload
    //                 state.data.userData = {};
    //                 state.data.isLogin = false;
    //                 state.data.isRegistered = false;
    //             },
    //             loadLogoutError: (state, action)=>{
    //                 state.data.logout.error= action.payload
    //             },
    //             loadRegister: (state, action)=>{
    //                 state.data.registers.response= action.payload
    //             },
    //             loadRegisterError: (state, action)=>{
    //                 state.data.registers.error= action.payload
    //             },
    //         },
    //         extraReducers: (builder) => {
    //         builder
    //             // .addCase(logoutUser.pending, (state) => {
    //             //     state.data.logout.loading = true;
    //             //     state.data.logout.error = null;
    //             // })
    //             // .addCase(logoutUser.fulfilled, (state, action) => {
    //             //     // Reset user data on successful logout
    //             //     state.data.userData = {};
    //             //     state.data.isLogin = false;
    //             //     state.data.isRegistered = false;
    //             //     state.data.logout.response = null;
    //             //     state.data.logout.loading = false;
    //             //     state.data.logout.error = null;
    //             // })
    //             // .addCase(logoutUser.rejected, (state, action) => {
    //             //     state.data.logout.error = action.payload;
    //             //     state.data.logout.loading = false;
    //             // });
    //     }

    //     })

    //     export const {loadUser ,loadRegisteredUser,
    //                     loadLogin,loadLoginError, 
    //                     loadLogout,loadLogoutError ,
    //                     loadRegister ,loadRegisterError,resetAuthState
    //                             } = authSlice.actions

    //     export default authSlice.reducer



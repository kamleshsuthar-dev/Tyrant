        import { createSlice } from "@reduxjs/toolkit"
    // import { logoutUser } from "../action/authAction";


        const initialState = {
            data: {
            userData: {},
            isLogin: false,
            isRegistered: false,
            login:{
                response :{},
                error: {}
            },
            registers:{
                response :{},
                error: {}
            },
            logout:{
                response :null,
                error: null
            },
            },
        }

        const authSlice = createSlice({
            name: "auth" ,
            initialState,
            reducers: {
                resetAuthState: () => {
                    return initialState; // This will reset everything to initial state
                    },
                loadUser: (state,action)=>{
                    state.data.isLogin = action.payload.success
                    state.data.userData = action.payload.user
                },
                loadRegisteredUser : (state,action)=>{
                    state.data.isRegistered = action.payload
                },
                loadLogin: (state, action)=>{
                    state.data.login.response= action.payload
                },
                loadLoginError: (state, action)=>{
                    state.data.login.error= action.payload
                },
                loadLogout: (state, action)=>{
                    state.data.logout.response= action.payload
                    state.data.userData = {};
                    state.data.isLogin = false;
                    state.data.isRegistered = false;
                },
                loadLogoutError: (state, action)=>{
                    state.data.logout.error= action.payload
                },
                loadRegister: (state, action)=>{
                    state.data.registers.response= action.payload
                },
                loadRegisterError: (state, action)=>{
                    state.data.registers.error= action.payload
                },
            },
            extraReducers: (builder) => {
            builder
                // .addCase(logoutUser.pending, (state) => {
                //     state.data.logout.loading = true;
                //     state.data.logout.error = null;
                // })
                // .addCase(logoutUser.fulfilled, (state, action) => {
                //     // Reset user data on successful logout
                //     state.data.userData = {};
                //     state.data.isLogin = false;
                //     state.data.isRegistered = false;
                //     state.data.logout.response = null;
                //     state.data.logout.loading = false;
                //     state.data.logout.error = null;
                // })
                // .addCase(logoutUser.rejected, (state, action) => {
                //     state.data.logout.error = action.payload;
                //     state.data.logout.loading = false;
                // });
        }

        })

        export const {loadUser ,loadRegisteredUser,
                        loadLogin,loadLoginError, 
                        loadLogout,loadLogoutError ,
                        loadRegister ,loadRegisterError,resetAuthState
                                } = authSlice.actions

        export default authSlice.reducer
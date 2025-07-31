
import axios from "@/Utils/axios";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {GoogleAuth} from "./features/auth";
import React, { useEffect } from "react";
import { checkIsLogin } from "./store/action/authAction.js";
import { useDispatch, useSelector } from "react-redux";




axios.defaults.withCredentials = true;

export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      
        <GoogleAuth text={text} />
     
    </GoogleOAuthProvider>
  );
};


function App() {
      const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(checkIsLogin())
    },[])

  
  return (
    <>
     <ErrorBoundary>
    <MainRoutes/>
     </ErrorBoundary>
    </>
  )
}

export default App;


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


import axios from "axios";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import GoogleAuth from "./components/Auth/GoogleAuth.jsx";



axios.defaults.withCredentials = true;

export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      
        <GoogleAuth text={text} />
     
    </GoogleOAuthProvider>
  );
};


function App() {

  return (
    <>
    <MainRoutes/>
    </>
  )
}

export default App;

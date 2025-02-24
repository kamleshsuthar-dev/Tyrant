import { Button } from "@/components/ui/button"
import axios from "axios"

export default function Profile() {
      const logout = async()=>{

        let res = await axios.post(`${import.meta.env.VITE_LOGOUT}`)
              console.log(res);
              
      }

  return (
    <>
    <div className="message"></div>
    <div className="h-screen w-screen flex  justify-center items-center">
      <h1 className="text-3xl ">PROFILE</h1>
        <Button
         className="flex text-2xl text-[#FFFFFF] bg-[#202020] py-[24px] px-[144px] rounded-xl"
          onClick={logout}
          >
         LOGOUT
       </Button>
    </div>
    </>
  )
}

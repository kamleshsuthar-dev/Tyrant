import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link,useNavigate } from "react-router-dom"
import { useGoogleAuthContext } from "@/context/GoogleAuth"
import axios from "axios"
import { useEffect, useState } from "react"
export default function Profile() {
 
  const [error,setError] = useState({
    contactError: ""
  })
  const [profile , setProfile] = useState({
    name : "",
    contact : "",
    gender : "",
    email : ""
  })
  
    const navigate = useNavigate()
  const logout = async()=>{

    let res = await axios.post(`${import.meta.env.VITE_LOGOUT}`)
          console.log(res);
          navigate('/')
          location.reload();
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_GET_PROFILE}`);
        console.log("Profile response:", res);
  
        // Defensive check
        const user = res?.data?.user;
        if (user) {
          setProfile(user);
        } else {
          console.warn("User data is missing in the response.");
          setProfile(null); 
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null); 
      }
    })();
  }, []);
  

  const updateProfile = async(e)=>{
    e.preventDefault()
    if(profile.contact.length === 10) {
   try {
     let res = await axios.post(`${import.meta.env.VITE_EDIT_PROFILE}`,{
       name : profile.name ,
       contact: profile.contact,
       gender : profile.gender 
     })
     console.log(res);
     alert (res.data.message)
     
   } catch (error) {
    console.log("edit profile error " , error);
    
   }finally{
    console.log("Done");
   
   }
  }else{
    setError({
      ...error , contactError : "Invalid Contact Number."
    })
  }
  }



  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/my-account" className="hover:text-foreground">
          MY ACCOUNT
        </Link>{" "}
        &gt;{" "}
        <Link href="/my-profile" className="hover:text-foreground">
          MY PROFILE
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">UPDATE,</h1>
          <h2 className="text-xl font-semibold">YOUR PROFILE PAGE</h2>
        </div>
        <Button variant="destructive"  onClick={logout}>LOG OUT</Button>
       
      </div>

      {/* Form */}
      <form className="mx-auto max-w-2xl space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">TITLE</Label>
            <Select defaultValue="mr">
              <SelectTrigger>
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mr">Mr.</SelectItem>
                <SelectItem value="mrs">Mrs.</SelectItem>
              
              </SelectContent>
            </Select>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">FULL NAME*</Label>
            <Input
              id="fullName"
              placeholder="Enter Full Name"
              className="bg-black text-white placeholder:text-gray-400"
              value= {profile?.name}
              onChange = {(e)=>{setProfile({...profile , name:e.target.value})}}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>GENDER</Label>
          <RadioGroup value={profile?.gender}  className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" onClick = {(e)=>{setProfile({...profile , gender: e.target.value})}} id="male" />
              <Label htmlFor="male">MALE</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" onClick = {(e)=>{setProfile({...profile , gender: e.target.value})}}/>
              <Label htmlFor="female">FEMALE</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobile">MOBILE NUMBER*</Label>
            <div className="flex">
              <Input type="text" value="+91" className="w-16 rounded-r-none border-r-0" readOnly />
              <Input id="mobile" type="number" placeholder="Enter Mobile Number" size="10" minLength="10" className="rounded-l-none" value= {profile?.contact} onChange={(e)=>{
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setProfile({ ...profile, contact: value });
                }
                if(value.length ===10){
                  setError({
                    ...error , contactError : ""
                  })
                }

              }}/>
            </div>
            <p className="text-red-500 text-xs mt-1">{error?.contactError }</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">EMAIL ID*</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              className="bg-black text-white placeholder:text-gray-400"
              value= {profile?.email}
              readOnly
            />
          </div>
        </div>

        {/* Date of Birth */}
        {/* <div className="space-y-2">
          <Label htmlFor="dob">DATE OF BIRTH</Label>
          <Input id="dob" type="date" />
        </div> */}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="destructive">DISCARD</Button>
          <Button className="bg-lime-500 hover:bg-lime-600" onClick = {updateProfile}>UPDATE</Button>
        </div>
      </form>
    </div>
  )
}



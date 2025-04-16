// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Plus } from "lucide-react"



// export default function Address() {
//   const [addresses, setAddresses] = useState([
//     {
//       id: "1",
//       label: "GHAR",
//       name: "MANUS LIMBACHIYA",
//       phone: "+91 8758403944",
//       addressLine1: "5, Rajpur, UMA",
//       addressLine2: "PG, Mahesana, Gujarat - 382715",
//       isDefault: false,
//       type: "HOME",
//     },
//     {
//       id: "2",
//       label: "PG",
//       name: "MANUS LIMBACHIYA",
//       phone: "+91 8758403944",
//       addressLine1: "5, Rajpur, UMA",
//       addressLine2: "PG, Mahesana, Gujarat - 382715",
//       isDefault: true,
//       type: "OTHER",
//     },
//     {
//       id: "3",
//       label: "GHAR",
//       name: "MANUS LIMBACHIYA",
//       phone: "+91 8758403944",
//       addressLine1: "5, Rajpur, UMA",
//       addressLine2: "PG, Mahesana, Gujarat - 382715",
//       isDefault: false,
//       type: "HOME",
//     },
//   ]);

//   const handleMakeDefault = (id) => {
//     setAddresses(
//       addresses.map((address) => ({
//         ...address,
//         isDefault: address.id === id,
//       })),
//     )
//   }

//   const handleDelete = (id) => {
//     setAddresses(addresses.filter((address) => address.id !== id))
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-sm text-gray-500">MY ACCOUNT &gt; MY ADDRESSES</div>
//       </div>

//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold">HERE ARE,</h1>
//           <h2 className="text-2xl font-bold">SAVED ADDRESSES</h2>
//         </div>
//         <Button className="rounded-full">
//           <Plus className="h-4 w-4 mr-2" /> ADD ADDRESS
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {addresses.map((address) => (
//           <Card key={address.id} className="border rounded-lg overflow-hidden">
//             <CardContent className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="font-bold">{address.label}</div>
//                 {address.isDefault ? (
//                   <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-md">Default Address</div>
//                 ) : (
//                   <button
//                     className="text-xs border border-dashed border-gray-400 px-3 py-1 rounded-md"
//                     onClick={() => handleMakeDefault(address.id)}
//                   >
//                     Make Default
//                   </button>
//                 )}
//               </div>

//               <div className="space-y-2 mb-4">
//                 <div className="font-medium">{address.name}</div>
//                 <div className="text-gray-600">{address.phone}</div>
//                 <div className="text-gray-600">{address.addressLine1}</div>
//                 <div className="text-gray-600">{address.addressLine2}</div>
//               </div>

//               <div className="text-center mb-4">ADDRESS TYPE : {address.type}</div>

//               <div className="grid grid-cols-2 gap-2">
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white py-1 rounded"
//                   onClick={() => handleDelete(address.id)}
//                 >
//                   Delete
//                 </button>
//                 <button className="bg-green-400 hover:bg-green-500 text-black py-1 rounded">Update</button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react';
import { Navigate,useNavigate,Outlet } from 'react-router-dom';
import AddAddress from './AddAddress';
import axios from 'axios';

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    ;(async()=>{
      try {
          let res = await axios.get(`${import.meta.env.VITE_GET_ADDRESS}`)

            console.log("all address " , res.data.address);
           
            setAddresses(res.data.address )
            
      } catch (error) {
        
      }
          
    })()
  },[])

  const handleMakeDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const handleDelete = async(id) => {
    console.log("gfgfgf",id);
    try {
      let res = await axios.delete(`${import.meta.env.VITE_DELETE_ADDRESS}/${id}`)
    } catch (error) {
      console.log("get address api error",error);
      
    }
    setAddresses((prevAddresses)=>prevAddresses.filter((address)=> address._id !== id));
  };

  const handleEdit = (id ,currAddress)=>{
      console.log("dgfdgdgd",id);
      navigate(`/profile/address/edit/${id}` ,{state : {currAddress}})
  }

  const AddAddress = () => {
    console.log("Add Address clicked");
    navigate('/profile/address/add')
  
   }


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-sm text-gray-600 mb-2">MY ACCOUNT &gt; MY ADDRESSES</div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">HERE ARE,</h1>
          <h1 className="text-3xl font-bold">SAVED ADDRESSES</h1>
        </div>
        <button className="border border-gray-300 rounded px-4 py-2 flex items-center gap-2" onClick={AddAddress}>
          <span className="text-xl">+</span> ADD ADDRESS
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(address => (
          <div key={address._id} className="border border-gray-300 rounded-lg p-6 relative">
            <div className="flex justify-between mb-4">
              <div className="font-bold">{address.nickName}</div>
              {address.isDefault ? (
                <div className="bg-black text-white text-sm px-3 py-1 rounded">Default Address</div>
              ) : (
                <button 
                  onClick={() => handleMakeDefault(address._id)}
                  className="border border-gray-800 text-sm border-dashed px-3 py-1 rounded"
                >
                  Make Default
                </button>
              )}
            </div>
            
            {/* <div className="mb-2">
              <div className="font-bold">{address.name}</div>
              <div className="text-gray-600">{address.phone}</div>
            </div> */}
            
            <div className="mb-6">
            <div>{address.addressLine} {address.landmark}</div>
            <div>{address.locality}, {address.state} - {address.pincode}</div>
            </div>
            
            <div className="mb-4 text-center">ADDRESS TYPE : {address.type}</div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => handleDelete(address._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Delete
              </button>
              <button className="flex-1 bg-green-400 text-black py-2 rounded"  onClick={() => handleEdit(address._id, address)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
     
    </div>

  );
}
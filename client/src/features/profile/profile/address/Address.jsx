
import { deleteAddress, fetchAddress } from "@/store/action/profileAction";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Address() {
  // const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {address : addresses , fetchStatus:{loading , error} ,deleteStatus:{loading:deleteLoading}} = useSelector(state=> state?.profile)
  console.log(addresses);
  
  useEffect(() => {
    dispatch(fetchAddress())
  }, []);


  
  const [deleteId , setdeleteId] = useState()
  const handleDelete = async (id) => {
    setdeleteId(id)
    dispatch(deleteAddress(id))
  };

  const handleEdit = (id, currAddress) => {
    console.log("dgfdgdgd", id);
    navigate(`/profile/address/edit/${id}`, { state: { currAddress } });
  };

  const AddAddress = () => {
    console.log("Add Address clicked");
    navigate("/profile/address/add");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-sm text-gray-600 mb-2">
        MY ACCOUNT &gt; MY ADDRESSES
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">HERE ARE,</h1>
          <h1 className="text-3xl font-bold">SAVED ADDRESSES</h1>
        </div>
        <button
          className="border border-gray-300 rounded px-4 py-2 flex items-center gap-2"
          onClick={AddAddress}
        >
          <span className="text-xl">+</span> ADD ADDRESS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        {loading ? <>
        <div className="font-bold text-2xl text-center">Loading...</div>
        </> :( addresses.map((address) => (
          <div
            key={address._id}
            className="border border-gray-300 rounded-lg p-6 relative"
          >
            <div className="flex justify-between mb-4">
              <div className="font-bold">{address.nickName}</div>
              {address.isDefault ? (
                <div className="bg-primary text-secondary text-sm px-3 py-1 rounded">
                  Default Address
                </div>
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

            <div className="mb-3 flex flex-col">
              <div>
                {address.addressLine} <br /> 
                {/* {address.landmark} */}
              </div>
              <div>
                {address.locality}
                 <br />
                 {address.city},{address.state} - {address.pincode}
              </div>
            </div>

            <div className="mb-4 text-center">
              ADDRESS TYPE : {address.type}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(address._id)}
                className="flex-1 bg-red-500 text-secondary py-2 rounded"
              >
                {deleteLoading && address._id=== deleteId ? "Loading..." : "Delete"}
              </button>
              <button
                className="flex-1 bg-green-400 text-primary py-2 rounded"
                onClick={() => handleEdit(address._id, address)}
              >
                Update
              </button>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}

import axios from 'axios';
import chalk from 'chalk';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function EditAddress() {
  const { AddressId } = useParams();
  const location = useLocation();
  const { currAddress } = location?.state;
  console.log(currAddress, "dfdfdsd");
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    nickName: currAddress.nickName || '',
    landmark: currAddress.landmark || '',
    addressLine: currAddress.addressLine || '',
    locality: currAddress.locality || '',
    pinCode: currAddress.pincode || '',
    state: currAddress.state || '',
    city: currAddress.city || '',
    type: currAddress.type || 'Home',
    isDefault: currAddress.isDefault || false
  });

  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.addressLine) newErrors.addressLine = 'Address line is required';
    if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.nickName) newErrors.nickName = 'NickName is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchLocationData = async (pincode) => {
    const pinToUse = pincode || formData.pinCode;
    
    if (pinToUse && pinToUse.length === 6) {
      try {
        // For India pincodes
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinToUse}`);
        const data = await response.json();
        console.log(data);

        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          const location = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: location?.District || "",
            state: location?.State || "",
          }));

          const newErrors = {};
          newErrors.pinCode = "";
          setErrors(newErrors);
        } else if (data[0].Status === "Error") {
          console.log(data[0].Message);
          if (data[0].Message === "No records found") {
            const newErrors = {};
            newErrors.pinCode = "Invalid Pincode";
            setErrors(newErrors);
          }
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }

    if (pinToUse && pinToUse.length !== 6) {
      setFormData((prev) => ({
        ...prev,
        city: "",
        state: "",
      }));
    }
  };

  // Run fetchLocationData with the initial pincode when component mounts
  useEffect(() => {
    if (currAddress && currAddress.pincode) {
      fetchLocationData(currAddress.pincode);
    }
  }, []);

  // Run fetchLocationData when pincode changes after initial load
  useEffect(() => {
    // Skip the first render as we handle it separately
    const skipFirstRender = currAddress && currAddress.pincode === formData.pinCode;
    if (!skipFirstRender) {
      fetchLocationData();
    }
  }, [formData.pinCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(errors);
    
    if (!validate()) return;
    setLoading(true);
  
    const payload = {
      nickName: formData.nickName,
      landmark: formData.landmark,
      addressLine: formData.addressLine,
      locality: formData.locality,
      pincode: formData.pinCode,
      city: formData.city,
      state: formData.state,
      type: formData.type.toLowerCase(),
      isDefault: formData.isDefault
    };
   
    try {
      const res = await axios.post(`${import.meta.env.VITE_EDIT_ADDRESS}/${AddressId}`, payload, {
        headers: {
          'Content-Type': 'application/json',   
        },
      });
  
      console.log(res.data, "response add address");
  
      if (res.status === 200 || res.status === 201) {
        console.log(chalk.green('Address saved successfully!'));
        setSuccess('Address saved successfully!');

        setFormData({
          fullName: '',
          mobileNumber: '',
          nickName: '',
          landmark: '',
          addressLine: '',
          locality: '',
          pinCode: '',
          state: 'Gujarat',
          city: '',
          type: 'Home',
          isDefault: false
        });
        // Reset form or redirect as needed
      } else {
        console.log(chalk.red('Failed to save address. Please try again.'));
      }
    } catch (error) {
      console.error('Error saving address:', error);
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        const newErrors = {};

        if (error.response.data.message === 'address with same nickname already exists') {
          newErrors.nickName = error.response.data.message;
        }
        setErrors(newErrors);
      }
      console.log(chalk.red('An error occurred. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };
  
  // Add your JSX return statement here
  // ...


  

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md">
      <div className="text-sm text-gray-500 border-b pb-2 mb-4">
        MY ACCOUNT &gt; MY PROFILE
      </div>
      <h3>ADD ,</h3>
      <h2 className="text-xl font-bold mb-4 pl-10"> YOUR ADDRESS</h2>
      
      <div className="bg-green-100 h-24 rounded-lg mb-6 relative">
        {/* Map container */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          {/* Map placeholder */}
          <div className="w-full h-full bg-green-100 relative">
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 mb-6 bg-green-50 text-green-700 rounded-md" >
          {success}
        </div>
      )}
      
      <form onSubmit={(e)=>handleSubmit(e,formData)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              FULL NAME<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter First Name"
              className={`w-full px-3 py-2 border rounded-md bg-black text-white ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              MOBILE NUMBER<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 border rounded-l-md bg-gray-100 text-gray-600">+91</span>
              <input
                type="number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="8758403944"
                className={`w-full px-3 py-2 border rounded-r-md ${errors.mobileNumber ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              ADDRESS NICK NAME<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Enter Address Nickname"
              className="w-full px-3 py-2 border rounded-md bg-black text-white"
            />
              {errors.nickName && <p className="text-red-500 text-xs mt-1">{errors.nickName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              LANDMARK<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Enter Nearest Landmark"
              className="w-full px-3 py-2 border rounded-md bg-black text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              ADDRESS LINE<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              placeholder="Flat No./ Building/ Company/ Street"
              className={`w-full px-3 py-2 border rounded-md bg-black text-white ${errors.addressLine ? 'border-red-500' : ''}`}
            />
            {errors.addressLine && <p className="text-red-500 text-xs mt-1">{errors.addressLine}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              PIN CODE<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Enter Valid Pincode"
              className={`w-full px-3 py-2 border rounded-md bg-red-100 ${errors.pinCode ? 'border-red-500' : ''}`}
            />
            <p className="text-gray-400 text-xs mt-1">Enter Valid Pincode</p>
            {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              LOCALITY<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              placeholder="Locality/Sector/Area"
              className="w-full px-3 py-2 border rounded-md bg-black text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              CITY<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              disabled
              onChange={handleChange}
              placeholder="Enter City"
              className={`w-full px-3 py-2 border rounded-md bg-black text-white ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              STATE<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              disabled
              value={formData.state}
              onChange={handleChange}
              placeholder="Gujarat"
              className={`w-full px-3 py-2 border rounded-md ${errors.state ? 'border-red-500' : ''}`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
         
          </div>
          
          <div className="pt-6">
            <p className="block text-sm font-medium mb-1">Address Type</p>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="addressType"
                  value="Home"
                  checked={formData.type === 'Home'}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                Home
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="addressType"
                  value="Work"
                  checked={formData.type === 'Work'}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                Work
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="addressType"
                  value="Other"
                  checked={formData.type === 'Other'}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="defaultAddress"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="defaultAddress">Make This My Default Address</label>
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            type="submit"
           disabled = {loading}
            className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
           {loading ? "Loading..." : "SAVE ADDRESS"}
          </button>
        </div>
      </form>
    </div>
  );
}
import userModels from "../models/user.models.js";

export const addUserAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const newAddress = {
      nickName: req.body.nickName,
      landmark: req.body.landmark,
      addressLine: req.body.addressLine,
      locality: req.body.locality,
      pincode: req.body.pincode,
      city: req.body.city,
      state: req.body.state,
      type: req.body.type,
      isDefault: req.body.isDefault,
    };
    const user = await userModels.findById(userId);
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "User Not Found" });

    const alreadyExists = user.address.some(address => address.nickName === req.body.nickName)
    if(alreadyExists) return res.status(400).json({success:false, message:'address with same nickname already exists'})
    user.address.push(newAddress);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(200)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
export const getUserAddress = async (req,res)=>{
  try {
      const userId = req.user._id;
      const user = await userModels.findById(userId).select("address -_id")
      if(!user){
          return res.status(200).json({success:false, message:"User not found"})
      }
      return res.status(200).json({success:true, address:user.address})
  } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
  } 
}
export const updateAddress = async (req,res)=>{
  const userId = req.user._id;
  const { addressId } = req.params;
  const { nickName, landmark, addressLine, locality, pincode, city, state, type, isDefault } = req.body;
  
  try {
    const user = await userModels.findById(userId);
    if(!user){
      return res.status(200).json({success:false, message:"User not found"})
    }
    const addressIndex = user.address.findIndex(address => address._id.toString() === addressId);
    
    if(addressIndex === -1){
      return res.status(200).json({success:false, message:"Address not found"})
    }
    const alreadyExists = user.address.some(address => address.nickName === nickName && address._id.toString() !== addressId)
    if(alreadyExists) return res.status(400).json({success:false, message:'address with same nickname already exists'})
    if(isDefault){
      user.address.forEach((address, index) => {
        if(index !== addressIndex){
          address.isDefault = false;
        }
      }
    )}
    const addressToUpdate = user.address[addressIndex];
    addressToUpdate.nickName = nickName;
    addressToUpdate.landmark = landmark;
    addressToUpdate.addressLine = addressLine;
    addressToUpdate.locality = locality;
    addressToUpdate.pincode = pincode;
    addressToUpdate.city = city;
    addressToUpdate.state = state;
    addressToUpdate.type = type;
    addressToUpdate.isDefault = isDefault;
    
    await user.save();
    return res.status(200).json({success:true, message:"address updated successfully"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
  } 
}
export const deleteAddress = async (req,res)=>{
  const userId = req.user._id;
  const { addressId } = req.params;
  console.log(addressId);
  
  try {
    const user = await userModels.findById(userId);
    if(!user){
      return res.status(200).json({success:false, message:"User not found"})
    }
    const addressIndex = user.address.findIndex(address => address._id.toString() === addressId);
    console.log(addressIndex);
    
    if(addressIndex === -1){
      return res.status(200).json({success:false, message:"Address not found"})
    }
    user.address.splice(addressIndex, 1);
    await user.save();
    return res.status(200).json({success:true, message:"address deleted successfully"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
  } 
};
export const getUserDetails = async (req,res)=>{
  try {
    const userId = req.user._id;
    const user = await userModels.findById(userId).select("name email contact gender")
    if(!user){
      return res.status(200).json({success:false, message:"User not found"})
    }
    return res.status(200).json({success:true, user})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
  } 
}
export const postUserDetails = async (req,res)=>{
  try {
    const userId = req.user._id;
    const {name, contact, gender} = req.body;

    const user = await userModels.findById(userId)
    if(!user){
      return res.status(200).json({success:false, message:"User not found"})
    }
    user.name = name || user.name;
    user.contact = contact || user.contact;
    user.gender = gender || user.gender;
    await user.save();
    return res.status(200).json({success:true, message:"User details updated successfully"})
  } catch (error) {
    return res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
  }

}
// export const sendMail = async (req,res)=>{
//   try {
//     const {from, email, subject, content}= req.body;
//     const response = await sendmail(from,email,subject,content);
//     if (response.success) {
//       res.status(200).json({success:true, message:"mail sent successfully"})
      
//     } else {
//       console.log(response)
//       res.status(500).json({success:false, message:"Unknown Error Occured"})
//     }
//   } catch (error) {
//     console.error(error)
//     res.send(error)
//   }
// }

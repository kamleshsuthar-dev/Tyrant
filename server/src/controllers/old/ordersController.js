import cartItemModels from "models/cartItem.models";
import orderModels from "models/order.models";
import userModels from "models/user.models";


export const getAllOrders = async (req,res)=>{
    const status = req.query.status;
    let orders = [];
    if(status=='all'){
        orders = await orderModels.find().populate({
            path: "orderItems.productId",
            model: "products",
            select: "pName pImages avgRating reviewCount",
        }); 
    }else{
        orders = await orderModels.find({"orderStatus": status}).populate({
            path: "orderItems.productId",
            model: "products",
            select: "pName pImages avgRating reviewCount",
        });
    }
    res.status(200).json({success:true, data:orders})
}
export const getUserOrders = async (req,res)=>{
    try {
        const userId = req.user._id;
        const orders = await orderModels.find({user: userId}).sort({createdAt:-1}).populate({
            path: "orderItems.productId",
            model: "products",
            select: "pName pImages avgRating reviewCount",
        });
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error getting user orders:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}
export const postCreateOrder = async (req,res)=>{
    try {
        const userId = req.user._id;
        const { cartItems, totalAmount, isPaid, addressId, paymentMethod } = req.body;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }
        else if(isNaN(totalAmount)){
            return res.status(400).send("amount invalid");
        }
        const cartItemIds = cartItems.map((item) => item.cartItemId);
        const cartItemsData  = await cartItemModels.find({ _id: { $in: cartItemIds }, user: userId });
            if (cartItemsData.length === 0) {
                return res.status(404).json({ message: "Cart items not found" });
            }
            const orderItems = cartItemsData.map((item) => {
                const itemData = cartItems.find(ci => ci.cartItemId.toString() === item._id.toString());
                if (!itemData) throw new Error("Mismatch between provided cart items and database");
    
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    variant: item.variant,
                    status: "ordered",
                    amount: itemData.amount, // Use amount from input
                    refundStatus: "not requested",
                };
            });
        const orderAddress = await userModels.findById(userId).then((user)=>{
            return user.address.id(addressId);
        })
        
        const newOrder = new orderModels({
            user: userId,
            orderItems,
            totalAmount,
            isPaid,
            orderAddress,
            paymentMethod,
            orderStatus: "ordered",
        });
        await newOrder.save();
        await userModels.findByIdAndUpdate(userId, {
                  $push: { orders: newOrder._id },
                  $pullAll: { cart: cartItemIds }, 
                });
        await cartItemModels.deleteMany({ _id: { $in: cartItemIds } });
        return res.status(200).json({success:true, message:"order confirmed", order: newOrder})
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
} 
export const postCancelOrder = async (req,res)=>{
    try {
        const {id} = req.params;
        const order = await orderModels.findById(id);
        if(!order){
            return res.status(400).json({success:false, message:"Order not found"})
        }
        if (order.orderStatus === "cancelled") {
            return res.status(400).json({ success: false, message: "Order is already cancelled" });
        }
        order.orderStatus = "cancelled"
        await order.save();
        return res.status(200).json({success:true, message:'order cancelled successfully'})
    } catch (error) {
        console.error("Error cancelling order:", error); 
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
    
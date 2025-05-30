// import Razorpay from 'razorpay'; 
// const RAZORPAY_ID_KEY = process.env.RAZORPAY_ID_KEY;
// const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;
// console.log("RAZORPAY_ID_KEY:", RAZORPAY_ID_KEY);
// console.log("RAZORPAY_SECRET_KEY:", RAZORPAY_SECRET_KEY);
// console.log("Server started listening on port " + process.env.PORT);

// let razorpayInstance;
// if (!razorpayInstance) {
//     razorpayInstance = new Razorpay({
//       key_id: process.env.RAZORPAY_ID_KEY,
//       key_secret: process.env.RAZORPAY_SECRET_KEY,
//     });
//   }
// export const createOrder = async(req,res)=>{
//     try {
//         const amount = req.body.amount*100
//         const options = {
//             amount: amount,
//             currency: 'INR',
//             receipt: 'razorUser@gmail.com'
//         }

//         razorpayInstance.orders.create(options, 
//             (err, order)=>{
//                 if(!err){
//                     res.status(200).send({
//                         success:true,
//                         msg:'Order Created',
//                         order_id:order.id,
//                         amount:amount,
//                         key_id:RAZORPAY_ID_KEY,
//                         product_name:req.body.name,
//                         description:req.body.description,
//                         contact: req.body.contact,
//                         name: "Tyrant",
//                         email: req.body.email,
//                         customerName: req.body.name
//                     });
//                 }
//                 else{
//                     res.status(400).json({success:false,error: err});
//                 }
//             }
//         );

//     } catch (error) {
//         console.log(error.message);
//     }
// }


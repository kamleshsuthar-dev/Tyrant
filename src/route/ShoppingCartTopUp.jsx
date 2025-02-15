import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';



const ShoppingCartTopUp = ({product}) => {
  
  console.log("hii",product);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 129.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 89.99, quantity: 1 },
    { id: 3, name: 'Product 3', price: 124.52, quantity: 1 },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };
 

  return (
    <>
    <Card className="w-full flex flex-col items-center justify-between gap-4 ">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cart</h2>
        
        {showSuccess && (
          <div className="bg-green-400 text-white px-4 py-2 rounded-md mb-4 text-center">
            Item Has Been Added Successfully
          </div>
        )}

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md">
                
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2">Lorem, ipsum dolor sit amet c </div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <button
                onClick={() => addToCart(item.id)}
                className="px-4 py-1 bg-green-400 text-white rounded-md hover:bg-green-500"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="font-semibold">SUBTOTAL</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex  gap-5">
        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
          CHECK OUT
        </Button>

    
          <Button variant="outline" className="w-full flex items-center gap-2" >
            <ShoppingCart size={16} />
            View Cart
          </Button>
   
     

      </CardFooter>
    </Card>
    </>
  );
};

export default ShoppingCartTopUp;
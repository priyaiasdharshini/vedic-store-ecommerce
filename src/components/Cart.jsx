import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import imgUrl from "../assets/yogapose.jpg";
import {
  increaseCartItem,
  decreaseCartItem,
} from "../utils/api";
import CartItemCard from './CartItemCard'


const Cart = () => {
  const {
    cartItems,
    getCartTotal,
    getCartItemsCount,
    getCartItems,
    cartItemPlus,
    cartItemMinus,
    deleteCartItem
  } = useCart();

  const navigate = useNavigate()

  useEffect(() => {
    const fn = async () => {
      await getCartItems()
    }
    fn()
    // setInterval(()=>fn(),3000)
  }, [])



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full h-full overflow-y-auto shadow-lg ">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-amber-800">
            Shopping Cart ({cartItems.length})
          </h2>

        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate('/')}
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => <CartItemCard key={item.id} item={item} /> )}
              </div>

              {/* Cart Footer */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-black">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-black">
                    ₹{getCartTotal().toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    className="block w-full text-center bg-[#f8b042] text-white py-3 rounded hover:bg-amber-700 font-semibold"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

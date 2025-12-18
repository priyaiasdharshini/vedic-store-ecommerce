import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    paymentMethod: "upi",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const subtotal = getCartTotal();
  const taxRate = 0.18;
  const taxAmount = Math.round(subtotal * taxRate);
  const discountedTotal = subtotal - discount;
  const grandTotal = discountedTotal + taxAmount;

  const applyCoupon = () => {
    if (coupon === "WELCOME10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMsg(`✅ Coupon applied! You saved ₹${disc}.`);
    } else if (coupon === "FLAT50") {
      setDiscount(50);
      setCouponMsg("✅ Flat ₹50 off applied!");
    } else {
      setDiscount(0);
      setCouponMsg("❌ Invalid or expired coupon.");
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("⚠️ Payment system failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_1234567890",
      amount: grandTotal * 100,
      currency: "INR",
      name: "AathiLife Store",
      description: "Secure Online Payment",
      handler: function (response) {
        alert(`🎉 Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setOrderPlaced(true);
        clearCart();
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      theme: {
        color: "#2563eb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerDetails.paymentMethod === "upi") {
      handleRazorpayPayment();
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-8">
        {orderPlaced ? (
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-3">
              🎉 Order Confirmed!
            </h2>
            <p className="text-gray-700 text-lg">
              Thanks <span className="font-semibold">{customerDetails.name}</span>, your
              order is on its way! We’ve sent your order details to{" "}
              <span className="font-medium text-blue-600">{customerDetails.email}</span>.
            </p>
          </div>
        ) : (
          <>
            {/* Left Section */}
            <form
              onSubmit={handleSubmit}
              id="checkoutForm"
              className="flex-1 bg-white shadow-lg rounded-2xl p-8 space-y-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                🛒 Secure Checkout
              </h2>

              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={customerDetails.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={customerDetails.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={customerDetails.phone}
                  onChange={handleChange}
                  required
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  minLength="10"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Complete Delivery Address"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
                  value={customerDetails.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  💳 Select Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={customerDetails.paymentMethod === "upi"}
                      onChange={handleChange}
                    />
                    <span className="font-medium">Pay Instantly (UPI / Card / Netbanking)</span>
                  </label>

                  {customerDetails.paymentMethod === "upi" && (
                    <div className="border rounded-lg p-3 bg-gray-50 text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Scan the QR below to complete your payment:
                      </p>
                      <img
                        src="/upi-qr.png"
                        alt="UPI QR Code"
                        className="w-36 h-36 mx-auto mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        After payment, click “Pay ₹{grandTotal}” to confirm.
                      </p>
                    </div>
                  )}

                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={customerDetails.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              {/* Mobile Button */}
              <div className="md:hidden pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
                >
                  {customerDetails.paymentMethod === "upi"
                    ? `Proceed to Pay ₹${grandTotal}`
                    : "Place Order Securely"}
                </button>
              </div>
            </form>

            {/* Right Section - Order Summary */}
            <div className="md:w-80 bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                🧾 Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <p>
                      {item.name} × {item.quantity}
                    </p>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}

                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Savings</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span>₹{taxAmount}</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p
                  className={`text-sm mt-2 ${
                    couponMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {couponMsg}
                </p>
              )}

              {/* Desktop Button */}
              <button
                type="submit"
                form="checkoutForm"
                className="hidden md:block w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
              >
                {customerDetails.paymentMethod === "upi"
                  ? `Proceed to Pay ₹${grandTotal}`
                  : "Place Order Securely"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;

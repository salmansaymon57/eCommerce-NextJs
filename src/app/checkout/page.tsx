// src/app/checkout/page.tsx
"use client";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";
import { useLoginQuery } from "../../../store/services/usersApi";
import React from "react";

const Checkout = () => {
  const { email, password, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // Fetch user data using stored credentials
  const { data: user } = useLoginQuery(
    { email: email || "", password: password || "" },
    { skip: !isAuthenticated }
  );

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // State for payment details
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber && expiryDate && cvv) {
      setIsConfirmed(true);
      // Simulate order placement (in a real app, this would hit an API)
      console.log("Order placed:", { user, cartItems, total: totalCartPrice });
    } else {
      alert("Please fill in all payment details.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-8 flex items-center justify-center">
          <p className="text-red-500 text-xl">
            You must be logged in to checkout.{" "}
            <button
              onClick={() => router.push("/")}
              className="text-blue-500 underline"
            >
              Log in
            </button>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-8">
          <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>
              <strong>Thank you, {user.name}!</strong>
            </p>
            <p>Your order has been placed successfully.</p>
            <p>
              <strong>Order Details:</strong>
            </p>
            <ul className="list-disc pl-5">
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} (x{item.quantity}) - $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold">
              Total: ${totalCartPrice.toFixed(2)}
            </p>
            <Button variant="primary" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4 font-bold text-right">
              Total: ${totalCartPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              <Input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <Input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <Input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              <Button variant="primary">Place Order</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

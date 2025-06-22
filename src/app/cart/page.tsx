// src/app/cart/page.tsx
"use client";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
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
            <Button variant="primary" onClick={() => router.push("/checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import Swal from "sweetalert2"; // Allowed package
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const handlePlaceOrder = () => {
    Swal.fire({
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      icon: "success",
    }).then(() => router.push("/"));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <Button variant="primary" onClick={() => setStep(2)}>
              Continue as Guest
            </Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            <Input type="text" name="name" />
            <Input type="text" name="address" />
            <Button variant="primary" onClick={() => setStep(3)}>
              Next
            </Button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Billing</h2>
            <Input type="checkbox" name="sameAsShipping" />
            <Button variant="primary" onClick={() => setStep(4)}>
              Next
            </Button>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <Input type="radio" name="payment" value="Credit Card" />
            <Input type="radio" name="payment" value="PayPal" />
            <Button variant="primary" onClick={() => setStep(5)}>
              Next
            </Button>
          </div>
        )}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Review</h2>
            <p>Items: Nike Air Zoom - $90</p>
            <p>Total: $105</p>
            <Button variant="primary" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

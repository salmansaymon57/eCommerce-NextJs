// app/cart/page.tsx
"use client";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import Link from "next/link";

const mockCart = [
  {
    id: "1",
    image: "/img1.jpg",
    name: "Nike Air Zoom",
    variant: "M/Black",
    quantity: 1,
  },
];

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8 md:flex">
        <div className="md:w-2/3">
          <table className="w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Variant</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockCart.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    /> */}
                    {item.name}
                  </td>
                  <td>{item.variant}</td>
                  <td>
                    <Input
                      type="text"
                      name="quantity"
                      value={item.quantity.toString()}
                    />
                  </td>
                  <td>
                    <Button variant="secondary">Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:w-1/3 md:pl-8 mt-4 md:mt-0">
          <div className="border p-4">
            <h4 className="font-bold">Summary</h4>
            <p>Subtotal: $90</p>
            <p>Taxes: $5</p>
            <p>Shipping: $10</p>
            <Input type="text" name="promo" />
            <Link href="/checkout">
              <Button variant="primary">Proceed to Checkout</Button>
            </Link>

            <Link href="/products">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

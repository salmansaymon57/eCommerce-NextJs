/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/dashboard/page.tsx
"use client";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Button";
import { useGetProductsQuery } from "../../../store/services/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginQuery } from "../../../store/services/usersApi";
import { useEffect } from "react";

const Dashboard = () => {
  const { email, password, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: products = [] } = useGetProductsQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // Keep the existing useLoginQuery
  const { data: user, refetch } = useLoginQuery(
    { email: email || "", password: password || "" },
    { skip: !isAuthenticated }
  );

  // Refetch user data when authentication state changes
  useEffect(() => {
    if (isAuthenticated && email && password) {
      refetch().then((result) => console.log("User data:", result.data));
    }
  }, [isAuthenticated, email, password, refetch]);

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const getProductName = (productId: string) =>
    products.find((p) => p.id === productId)?.title || "Unknown";

  // Check if user is an array and use the first element, fallback to null
  const displayUser = Array.isArray(user) && user.length > 0 ? user[0] : null;

  if (!displayUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-8 flex items-center justify-center">
          <p className="text-red-500 text-xl">
            You are not logged in.{" "}
            <Link href="/" className="text-blue-500 underline">
              Log in
            </Link>
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <p>
              <strong>Name:</strong> {displayUser.name || "Not available"}
            </p>
            <p>
              <strong>Email:</strong> {displayUser.email || "Not available"}
            </p>
            <p>
              <strong>Address:</strong> {displayUser.address || "Not available"}
            </p>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {displayUser.orders && displayUser.orders.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Items</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {displayUser.orders.map((order) => (
                    <tr key={order.id} className="border">
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">
                        {order.items.map((item) => (
                          <div key={item.productId}>
                            {getProductName(item.productId)} (x{item.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
                      <td className="p-2">
                        <Button
                          variant="primary"
                          onClick={() => {
                            order.items.forEach((item) => {
                              const product = products.find(
                                (p) => p.id === item.productId
                              );
                              if (product) {
                                console.log(
                                  `Reordered ${item.quantity}x ${product.title}`
                                );
                              }
                            });
                            router.push("/cart");
                          }}
                        >
                          Reorder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            ) : (
              <p>No orders yet.</p>
            )}
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="mt-4 font-bold">
                  Total: ${totalCartPrice.toFixed(2)}
                </div>
                <Button variant="primary" onClick={() => router.push("/cart")}>
                  View Cart
                </Button>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

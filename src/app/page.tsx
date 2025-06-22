// src/app/page.tsx
"use client";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { CarouselWrapper } from "../../components/CarouselWrapper";
import { ClientSection } from "../../components/ClientSection";
import { useGetProductsQuery } from "../../store/services/productsApi";
import { ProductCard } from "../../components/ProductCard";
import { ReduxProviderWrapper } from "../../components/ReduxProviderWrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSignUpMutation,
  useLoginQuery,
} from "../../store/services/usersApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
  tablet: { breakpoint: { max: 1199, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
};

export default function Home() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState(""); // Added state for address
  const [signUp] = useSignUpMutation();
  const { data: user, refetch: login } = useLoginQuery(
    { email, password },
    { skip: !email || !password }
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      await signUp({ email, password, name, address }).unwrap(); // Added address to signUp call
      alert("Sign-up successful! Please log in.");
      setIsSignUp(false);
      setEmail("");
      setPassword("");
      setName("");
      setAddress(""); // Clear address field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Sign-up failed. Email may already exist or address is invalid.");
    }
  };

  const handleLogin = async () => {
    try {
      await login().unwrap();
      if (user) {
        dispatch(setCredentials({ email, password }));
        alert("Login successful!");
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Login failed. Check your email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="h-96 bg-gray-200 flex items-center justify-center">
          <ReduxProviderWrapper>
            <CarouselWrapper responsive={responsive} autoPlay>
              {isLoading && <p>Loading products...</p>}
              {error && <p className="text-red-500">Failed to load products</p>}
              {!isLoading &&
                !error &&
                products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="h-96 bg-cover bg-center flex items-center justify-center"
                  >
                    <ProductCard
                      {...product}
                      name={product.title}
                      price={product.price}
                    />
                  </div>
                ))}
            </CarouselWrapper>
          </ReduxProviderWrapper>
        </section>
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500 text-white p-4 text-center">
            Sale 20% Off
          </div>
          <div className="bg-blue-500 text-white p-4 text-center">
            Free Shipping
          </div>
          <div className="bg-green-500 text-white p-4 text-center">
            New Arrivals
          </div>
        </section>
        <section className="p-8">
          <h2 className="animate-pulse text-2xl font-bold mb-4">
            Featured Categories
          </h2>
         
        </section>
        <ClientSection />

        <section className="p-8">
          <h2 className="text-2xl font-bold mb-4">Account</h2>
          <ReduxProviderWrapper>
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 ${
                    !isSignUp ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2 ${
                    isSignUp ? "border-b-2 border-blue-500" : ""
                  }`}
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </div>
              {isSignUp ? (
                <div>
                  <span>Name : </span>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span>Email : </span>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>Password : </span>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>Address : </span>
                  <Input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div>
                  <span>Email : </span>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>Password : </span>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              )}
            </div>
          </ReduxProviderWrapper>
        </section>
      </main>
      <Footer />
    </div>
  );
}

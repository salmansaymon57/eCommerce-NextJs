// app/page.tsx
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { CarouselWrapper } from "../../components/CarouselWrapper";
import { ClientSection } from "../../components/ClientSection";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
  tablet: { breakpoint: { max: 1199, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="h-96 bg-gray-200 flex items-center justify-center">
          <CarouselWrapper responsive={responsive} autoPlay>
            <div
              className="h-96 bg-cover bg-center"
              style={{ backgroundImage: "url(/banner1.jpg)" }}
            >
              <Button variant="primary">Shop Now</Button>
            </div>
            <div
              className="h-96 bg-cover bg-center"
              style={{ backgroundImage: "url(/banner2.jpg)" }}
            >
              <Button variant="primary">Shop Now</Button>
            </div>
          </CarouselWrapper>
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
          <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/products?category=electronics"
              className="bg-gray-200 p-4 text-center"
            >
              Electronics
            </a>
            <a
              href="/products?category=clothing"
              className="bg-gray-200 p-4 text-center"
            >
              Clothing
            </a>
            <a
              href="/products?category=home"
              className="bg-gray-200 p-4 text-center"
            >
              Home
            </a>
            <a
              href="/products?category=footwear"
              className="bg-gray-200 p-4 text-center"
            >
              Footwear
            </a>
          </div>
        </section>
        <ClientSection />
        <section className="p-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
          <div className="flex max-w-md mx-auto">
            <Input type="text" name="email" />
            <Button variant="primary">Subscribe</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

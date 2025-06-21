// components/Footer.tsx
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Input } from "./Input";
import { Button } from "./Button";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <h4 className="font-bold mb-2">Support</h4>
        <a href="#" className="block text-sm hover:text-blue-400">
          Help Center
        </a>
        <a href="#" className="block text-sm hover:text-blue-400">
          Contact Us
        </a>
      </div>
      <div>
        <h4 className="font-bold mb-2">Social Media</h4>
        <div className="flex space-x-4">
          <FaFacebook className="w-6 h-6 hover:text-blue-400" />
          <FaTwitter className="w-6 h-6 hover:text-blue-400" />
          <FaInstagram className="w-6 h-6 hover:text-blue-400" />
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-2">Newsletter</h4>
        <Input type="text" name="email" placeholder="Enter your email" />
        <Button variant="primary">Subscribe</Button>
      </div>
      <div>
        <h4 className="font-bold mb-2">Download App</h4>
        <a href="#" className="block text-sm hover:text-blue-400">
          iOS
        </a>
        <a href="#" className="block text-sm hover:text-blue-400">
          Android
        </a>
      </div>
    </footer>
  );
};

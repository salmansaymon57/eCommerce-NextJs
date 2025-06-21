// components/Button.tsx
"use client"; // Client component for interactivity
import { ReactNode } from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa"; // React Icon

type ButtonProps = {
  variant?: "primary" | "secondary" | "icon";
  children?: ReactNode;
  icon?: "search" | "wishlist" | "cart";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  variant = "primary",
  children,
  icon,
  disabled,
  onClick,
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition";
  const variantStyles = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 ${
      disabled ? "bg-gray-400 cursor-not-allowed" : ""
    }`,
    secondary: `bg-gray-200 text-black hover:bg-gray-300 active:bg-gray-400 ${
      disabled ? "bg-gray-100 cursor-not-allowed" : ""
    }`,
    icon: "p-2 bg-transparent hover:bg-gray-100 active:bg-gray-200",
  };

  const IconComponent =
    icon === "search"
      ? FaSearch
      : icon === "wishlist"
      ? FaHeart
      : FaShoppingCart;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon ? <IconComponent className="w-5 h-5" /> : children}
    </button>
  );
};

// components/Input.tsx
"use client";
import { ChangeEvent } from "react";

type InputProps = {
  type?: "text" | "select" | "checkbox" | "radio";
  name: string;
  value?: string | string[];
  options?: string[]; // For select
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export const Input = ({
  type = "text",
  name,
  value,
  options,
  error,
  onChange,
}: InputProps) => {
  const baseStyles =
    "border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none";
  const errorStyles = error ? "border-red-500" : "border-gray-300";

  if (type === "select") {
    return (
      <div className="mb-4">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseStyles} ${errorStyles} w-full`}
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  if (type === "checkbox" || type === "radio") {
    return (
      <div className="flex items-center mb-2">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2">{name}</label>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${errorStyles} w-full`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

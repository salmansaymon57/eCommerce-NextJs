// components/Input.tsx
import React from "react";

interface BaseInputProps {
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
}

interface ControlledInputProps extends BaseInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface UncontrolledInputProps extends BaseInputProps {
  value?: never; // Prevent value when uncontrolled
  onChange?: never; // Prevent onChange when uncontrolled
  defaultValue?: string; // Allow defaultValue for uncontrolled
}

type InputProps = ControlledInputProps | UncontrolledInputProps;

export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,

  className = "",
}: InputProps) => {
  // Ensure the input is not read-only if value is provided without onChange
  if (value && !onChange) {
    console.warn(
      `Input with name "${name}" has a value prop but no onChange handler. Using defaultValue instead.`
    );
    return (
      <div className={`mb-4 ${className}`}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={value} // Fallback to defaultValue
          className="w-full p-2 border rounded"
        />
      </div>
    );
  }

  return (
    <div className={`mb-4 ${className}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

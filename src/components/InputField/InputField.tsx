import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, placeholder, type, value, onChange }: InputFieldProps) {
  return (
    <div className="w-full inline-flex flex-col gap-1">
      <p>{label}</p>
      <input
        className="rounded-lg h-12 px-4 border-2 border-[#E4E4E7] focus:outline-none focus:ring-0 focus:border-green-700"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

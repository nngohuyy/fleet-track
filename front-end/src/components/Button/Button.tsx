// components/Button.tsx
"use client";

import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "link"; // Different styles
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  startContent?: React.ReactNode;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  radius = "md",
  startContent,
  isFullWidth = false,
  isIconOnly = false,
  isDisabled = false,
  onClick,
}) => {
  // Classes for different styles
  const variantClasses = {
    solid: "bg-blue-500 text-white",
    outline: "border border-blue-500 text-blue-500",
    ghost: "bg-transparent text-blue-500",
    link: "text-blue-500 underline",
  };

  const colorClasses = {
    primary: "text-blue-500",
    secondary: "text-gray-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] hover:border-transparent gap-2
        ${variantClasses[variant]} ${colorClasses[color]}
        ${sizeClasses[size]} ${radiusClasses[radius]}
        ${isFullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isIconOnly ? "p-2" : ""}`}
    >
      {startContent && !isIconOnly && <span className="flex">{startContent}</span>}
      {!isIconOnly && children}
      {isIconOnly && children}
    </button>
  );
};

export default Button;

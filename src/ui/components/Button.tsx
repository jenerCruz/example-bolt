import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "brand-primary" | "brand-secondary" | "neutral-primary" | "neutral-secondary";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  variant = "brand-primary",
  icon,
  onClick,
  className = "",
  type = "button"
}: ButtonProps) {
  const variants = {
    "brand-primary": "bg-[#ff0071] text-white hover:bg-[#e6006] border-[#ff0071]",
    "brand-secondary": "bg-pink-50 text-[#ff0071] hover:bg-pink-100 border-pink-200",
    "neutral-primary": "bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900",
    "neutral-secondary": "bg-white text-neutral-900 hover:bg-neutral-50 border-neutral-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}

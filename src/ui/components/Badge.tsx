import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "neutral" | "brand" | "success" | "warning" | "error";
  icon?: React.ReactNode;
  className?: string;
};

export function Badge({ children, variant = "neutral", icon, className = "" }: BadgeProps) {
  const variants = {
    neutral: "bg-neutral-100 text-neutral-700 border-neutral-300",
    brand: "bg-pink-50 text-pink-700 border-pink-300",
    success: "bg-green-50 text-green-700 border-green-300",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-300",
    error: "bg-red-50 text-red-700 border-red-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
}

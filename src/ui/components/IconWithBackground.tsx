import React from "react";

type IconWithBackgroundProps = {
  icon: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "brand" | "neutral" | "success" | "warning" | "error";
};

export function IconWithBackground({
  icon,
  size = "medium",
  variant = "brand"
}: IconWithBackgroundProps) {
  const sizes = {
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-base",
    large: "w-12 h-12 text-lg",
  };

  const variants = {
    brand: "bg-pink-100 text-[#ff0071]",
    neutral: "bg-neutral-100 text-neutral-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${sizes[size]} ${variants[variant]}`}
    >
      {icon}
    </div>
  );
}

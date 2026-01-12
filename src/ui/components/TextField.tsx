import React from "react";

type TextFieldProps = {
  children: React.ReactNode;
  label?: string;
  variant?: "outlined" | "filled";
  className?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextField({ children, label, variant = "outlined", className = "" }: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      {children}
    </div>
  );
}

TextField.Input = function TextFieldInput({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors focus:border-[#ff0071] focus:outline-none focus:ring-2 focus:ring-pink-100 ${className}`}
    />
  );
};

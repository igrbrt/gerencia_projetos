import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  type: "success" | "error" | "warning" | "info";
}

const badgeStyles = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
};

export default function Badge({ children, className, type }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[type]} ${className}`}
    >
      {children}
    </span>
  );
}

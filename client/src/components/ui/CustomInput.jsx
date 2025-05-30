import { PasswordCloseEye, PasswordOpenEye } from "@/assets/Icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const statusClasses = {
  idle: "border-primary focus-visible:border-blue-500",
  success: "border-green-500 focus-visible:border-green-600",
  error: "border-destructive focus-visible:border-destructive",
  warning: "border-yellow-500 focus-visible:border-yellow-600",
};

export default function CustomInput({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  status = "idle",
  message = "",
  className = "",
  name,
  placeholder,
  required = false,
  enableToggle = false, // For password toggle
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    enableToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-base font-medium text-primary"
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full rounded-md transition-all duration-150 ${statusClasses[status]} ${className}`}
          {...rest}
        />
        {enableToggle && type === "password" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <PasswordCloseEye /> : <PasswordOpenEye />}
          </div>
        )}
      </div>
      {status === "error" && message && (
        <p className="mt-1 text-sm text-red-500">{message}</p>
      )}
      {status === "warning" && message && (
        <p className="mt-1 text-sm text-yellow-500">{message}</p>
      )}
    </div>
  );
}

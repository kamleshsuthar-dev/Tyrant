import { PasswordCloseEye, PasswordOpenEye } from "@/assets/Icons";
import { Input } from "@/components/ui/input";
import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";

const statusClasses = {
  normal: "border-gray-300 focus-visible:border-blue-500", // Default state
  idle: "border-primary focus-visible:border-blue-500",     // When focused/active
  success: "border-green-500 focus-visible:border-green-600", // When valid
  error: "border-destructive focus-visible:border-destructive", // When error
  warning: "border-yellow-500 focus-visible:border-yellow-600", // When warning
};

const CustomInput = forwardRef(({
  forgotPassword =false,
  label,
  type = "text",
  status = "normal",
  message = "",
  className = "",
  name,
  placeholder,
  required = false,
  enableToggle = false,
  error,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine the input type
  const inputType =
    enableToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  // Determine status based on error prop, focus state, or explicit status
  const getCurrentStatus = () => {
    if (error) return "error";
    if (isFocused && status === "normal") return "idle";
    return status;
  };

  const currentStatus = getCurrentStatus();
  
  // Use error message from React Hook Form if available, otherwise use message prop
  const displayMessage = error?.message || message;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-base font-medium text-primary"
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {forgotPassword && (
        <Link
          to="/forgotpasswordform"
          htmlFor={name}
          className="text-sm text-[#0F7DE3] mt-1"
        >
          Forgot Password?
        </Link>
      )}
      </div>
      <div className="relative">
        <Input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`w-full rounded-md transition-all duration-150 ${statusClasses[currentStatus]} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
      {currentStatus === "error" && displayMessage && (
        <p className="mt-1 text-sm text-red-500">{displayMessage}</p>
      )}
      {currentStatus === "warning" && displayMessage && (
        <p className="mt-1 text-sm text-yellow-500">{displayMessage}</p>
      )}
      {currentStatus === "success" && (
        <p className="mt-1 text-sm text-green-500">✓ Valid</p>
      )}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
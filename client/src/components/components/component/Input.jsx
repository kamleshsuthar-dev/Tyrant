// import { PasswordCloseEye, PasswordOpenEye } from "@/assets/Icons";
// import { Input } from "@/components/ui/input";
// import { useState, forwardRef } from "react";
// import { Link } from "react-router-dom";

// const statusClasses = {
//   normal: "border-gray-300 focus-visible:border-blue-500", // Default state
//   idle: "border-primary focus-visible:border-blue-500",     // When focused/active
//   success: "border-green-500 focus-visible:border-green-600", // When valid
//   error: "border-destructive focus-visible:border-destructive", // When error
//   warning: "border-yellow-500 focus-visible:border-yellow-600", // When warning
// };

// const CustomInput = forwardRef(({
//   forgotPassword =false,
//   label,
//   type = "text",
//   status = "normal",
//   message = "",
//   className = "",
//   name,
//   placeholder,
//   required = false,
//   enableToggle = false,
//   error,
//   ...rest
// }, ref) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
  
//   // Determine the input type
//   const inputType =
//     enableToggle && type === "password"
//       ? showPassword
//         ? "text"
//         : "password"
//       : type;

//   // Determine status based on error prop, focus state, or explicit status
//   const getCurrentStatus = () => {
//     if (error) return "error";
//     if (isFocused && status === "normal") return "idle";
//     return status;
//   };

//   const currentStatus = getCurrentStatus();
  
//   // Use error message from React Hook Form if available, otherwise use message prop
//   const displayMessage = error?.message || message;

//   return (
//     <div className="w-full">
//       <div className="flex justify-between mb-1">
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-base font-medium text-primary"
//         >
//           {label} {required && <span className="text-destructive">*</span>}
//         </label>
//       )}

//       {forgotPassword && (
//         <Link
//           to="/forgotpasswordform"
//           htmlFor={name}
//           className="text-sm text-[#0F7DE3] mt-1"
//         >
//           Forgot Password?
//         </Link>
//       )}
//       </div>
//       <div className="relative">
//         <Input
//           ref={ref}
//           id={name}
//           name={name}
//           type={inputType}
//           placeholder={placeholder}
//           className={`w-full rounded-md transition-all duration-150 ${statusClasses[currentStatus]} ${className}`}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           {...rest}
//         />
//         {enableToggle && type === "password" && (
//           <div
//             className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
//             onClick={() => setShowPassword((prev) => !prev)}
//           >
//             {!showPassword ? <PasswordCloseEye /> : <PasswordOpenEye />}
//           </div>
//         )}
//         {/* <div className="w-full h-[31px] absolute rounded-md transition-all duration-150 bg-red-600 z-20"></div> */}
//       </div>
//       {currentStatus === "error" && displayMessage && (
//         <p className="mt-1 text-sm text-red-500">{displayMessage}</p>
//       )}
//       {currentStatus === "warning" && displayMessage && (
//         <p className="mt-1 text-sm text-yellow-500">{displayMessage}</p>
//       )}
//       {currentStatus === "success" && (
//         <p className="mt-1 text-sm text-green-500">✓ Valid</p>
//       )}
//     </div>
//   );
// });

// CustomInput.displayName = "CustomInput";

// export default CustomInput;



"use client"

import { PasswordCloseEye, PasswordOpenEye } from "@/assets/Icons"
import { Input } from "@/components/ui/input"
import { useState, forwardRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const statusClasses = {
  normal: "border-gray-300 focus-visible:border-blue-500", // Default state
  idle: "border-primary focus-visible:border-blue-500", // When focused/active
  success: "border-green-500 focus-visible:border-green-600", // When valid
  error: "border-destructive focus-visible:border-destructive", // When error
  warning: "border-yellow-500 focus-visible:border-yellow-600", // When warning
}

const CustomInput = forwardRef(
  (
    {
      forgotPassword = false,
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
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    // Determine the input type
    const inputType = enableToggle && type === "password" ? (showPassword ? "text" : "password") : type

    // Determine status based on error prop, focus state, or explicit status
    const getCurrentStatus = () => {
      if (error) return "error"
      if (isFocused && status === "normal") return "idle"
      return status
    }

    const currentStatus = getCurrentStatus()
    const hasError = currentStatus === "error"
    const hasSuccess = currentStatus === "success"
    const shouldShrink = hasError || hasSuccess

    // Use error message from React Hook Form if available, otherwise use message prop
    const displayMessage = error?.message || message

    return (
      <div className="w-full">
        <div className="flex justify-between mb-1">
          {label && (
            <label htmlFor={name} className="block text-base font-medium text-primary">
              {label} {required && <span className="text-destructive">*</span>}
            </label>
          )}
          {forgotPassword && (
            <Link to="/forgotpasswordform" htmlFor={name} className="text-sm text-[#0F7DE3] mt-1">
              Forgot Password?
            </Link>
          )}
        </div>

        <div className="relative">
          {/* Error background div - animated */}
          <motion.div
            className="absolute inset-0 rounded-md bg-destructive z-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hasError ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Success background div - animated */}
          <motion.div
            className="absolute inset-0 rounded-md bg-green-500 z-10"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hasSuccess ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Input container for animation */}
          <div className="relative flex items-center">
            <motion.div
              className="relative z-20"
              animate={{
                width: shouldShrink ? "90%" : "100%",
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <Input
                ref={ref}
                id={name}
                name={name}
                type={inputType}
                placeholder={placeholder}
                className={`w-full rounded-md transition-all duration-150 bg-white ${statusClasses[currentStatus]} ${className} relative z-20`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
              />
            </motion.div>

            {/* Password toggle - positioned based on input width */}
            {enableToggle && type === "password" && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 transform cursor-pointer z-30"
                animate={{
                  right: shouldShrink ? "calc(10% + 12px)" : "12px",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <PasswordCloseEye /> : <PasswordOpenEye />}
              </motion.div>
            )}

            {/* Error icon - positioned on the red background part */}
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute  transform -translate-y-1/2 z-30"
                  style={{ right: "5%" }}
                >
                  <AlertCircle className="h-5 w-5 pl-[6px] text-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success icon - positioned on the green background part */}
            <AnimatePresence className="flex">
              {hasSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute transform -translate-y-1/2 z-30"
                  style={{ right: "5%" }}
                >
                  <Circle className="h-5 w-5 border-1 pl-[5px]  text-white">
                  <Check className="h-3 w-3 text-white" />
                  </Circle>
                  {/* <div className="h-3 w-3 border-1 border-white rounded-full">
                  </div> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Error message with animation */}
        <AnimatePresence>
          {currentStatus === "error" && displayMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 text-sm text-red-500"
            >
              {displayMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Warning message with animation */}
        <AnimatePresence>
          {currentStatus === "warning" && displayMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 text-sm text-yellow-500"
            >
              {displayMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success message with animation */}
        <AnimatePresence>
          {currentStatus === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 text-sm text-green-500"
            >
              {/* ✓ Valid */}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

CustomInput.displayName = "CustomInput"

export default CustomInput



"use client"

// import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Check, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"


export function AnimatedInput({ label, placeholder = "Text", required = false, error, value, onChange }) {
  const hasError = !!error

  return (
    <div className="w-full max-w-md space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {/* Red background div - always present but only visible during error */}
        <motion.div
          className="absolute inset-0 rounded-md bg-red-500"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hasError ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        />

        {/* Input container for positioning */}
        <div className="relative flex items-center">
          {/* Input field - sits on top of the red div */}
          <motion.input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`
              px-3 py-2 rounded-md border transition-colors duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 relative z-10
              ${
                hasError
                  ? "border-red-500 focus:ring-red-500 bg-white"
                  : "border-gray-300 focus:ring-blue-500 bg-white hover:border-gray-400"
              }
            `}
            animate={{
              width: hasError ? "90%" : "100%",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Error icon - positioned absolutely within the input area */}
          <AnimatePresence>
            {hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20"
                style={{ right: hasError ? "calc(10% + 12px)" : "12px" }}
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export  function Component() {
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [showError, setShowError] = useState(false)

  const toggleError = () => {
    setShowError(!showError)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="space-y-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Animated Input Fields</h1>
          <p className="text-gray-600">Input shrinks to 90% width on error, revealing red background</p>
        </div>

        {/* Normal input */}
        <AnimatedInput label="LABEL" required value={value1} onChange={setValue1} placeholder="Text" />

        {/* Input with conditional error */}
        <AnimatedInput
          label="LABEL"
          value={value2}
          onChange={setValue2}
          placeholder="Text"
          error={showError ? "Error message" : undefined}
        />

        {/* Toggle button */}
        <Button onClick={toggleError} className="w-full" variant={showError ? "destructive" : "default"}>
          {showError ? "Hide Error" : "Show Error"}
        </Button>

        {/* Demo section */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Animation Details:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Input sits on top of red background div</li>
            <li>• Input width animates to 90% on error</li>
            <li>• Red div becomes visible around input edges</li>
            <li>• Error icon positioned within input area</li>
            <li>• Smooth transitions for all state changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

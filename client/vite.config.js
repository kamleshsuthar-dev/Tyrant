import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
 
    server :{
      proxy:{
        "/api/auth/google" : "http://localhost:5173"
      }
    },
  plugins: [react()],
  resolve: {
    alias: {
       "@": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["@mui/material", "@mui/system", "react-icons"],
  },
  
})

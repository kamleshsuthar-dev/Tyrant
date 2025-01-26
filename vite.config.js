import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 
    server :{
      proxy:{
        "/api/auth/google" : "http://localhost:5173"
      }
    },
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/system", "react-icons"],
  },
  
})

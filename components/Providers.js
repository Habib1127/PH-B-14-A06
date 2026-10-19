"use client";

import { Toaster } from "react-hot-toast";
import { FitlogProvider } from "@/lib/store";

export default function Providers({ children }) {
  return (
    <FitlogProvider>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2600,
          style: {
            background: "#141414",
            color: "#f5f5f5",
            border: "1px solid #2a2a2a",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#ccff00", secondary: "#0a0a0a" },
          },
          error: {
            iconTheme: { primary: "#ff5a5a", secondary: "#0a0a0a" },
          },
        }}
      />
    </FitlogProvider>
  );
}

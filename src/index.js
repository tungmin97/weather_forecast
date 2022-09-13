import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SWRConfig } from "swr";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast.error("City not found", {
    position: "bottom-center",
    icon: "❌",
    duration: 4000,
    gutter: 24,
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SWRConfig
    value={{
      onError: (error) => {
        if (error) notify();
      },
      onSuccess: (data) => {
        if (data) toast.dismiss();
      },
      shouldRetryOnError: false,
    }}
  >
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </SWRConfig>
);

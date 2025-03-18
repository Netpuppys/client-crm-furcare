import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJxWmFZfVtgdV9HaVZQQWYuP1ZhSXxWdkZiUX9cdHBQQmVcWUY="
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

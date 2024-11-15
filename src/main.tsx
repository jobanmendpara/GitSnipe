import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./chrome-extension/popup/index";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-background w-[400px] h-full">
      <Popup />
    </div>
  </StrictMode>
);

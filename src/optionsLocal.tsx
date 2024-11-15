import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Options from "./chrome-extension/options/index";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-background w-full h-[1000px]">
      <Options />
    </div>
  </StrictMode>
);

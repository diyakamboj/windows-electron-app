// app/components/ElectronExample.tsx
"use client";

import { useEffect } from "react";
import { getIpcRenderer, isElectron } from "../utils/electron";

export default function ElectronExample() {
  useEffect(() => {
    if (isElectron()) {
      const ipcRenderer = getIpcRenderer();
      if (ipcRenderer) {
        ipcRenderer.on("message-from-main", (event, arg) => {
          console.log("Received from main:", arg);
        });
      }
    }
  }, []);

  const handleClick = () => {
    if (isElectron()) {
      const ipcRenderer = getIpcRenderer();
      if (ipcRenderer) {
        ipcRenderer.send("message-to-main", "Hello from Next.js!");
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send Message to Main Process
      </button>
    </div>
  );
}

// app/utils/electron.ts
export const isElectron = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true;
  }
  return false;
};

export const getIpcRenderer = () => {
  if (isElectron()) {
    const electron = window.require("electron");
    return electron.ipcRenderer;
  }
  return null;
};

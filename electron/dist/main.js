"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Set app metadata
electron_1.app.setName("SnapDragon Windows App");
const isDev = process.env.NODE_ENV === "development";
// Read package.json to get app details
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8"));
const appName = "SnapDragon Windows App";
const appVersion = packageJson.version;
const appDescription = packageJson.description;
function createWindow() {
    // Create the browser window.
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        // Set window properties
        title: "SnapDragon Windows App",
        icon: path.join(__dirname, "../../resources/icon.ico"),
        // Add minimal window styling
        frame: true, // Set to false for frameless window
        backgroundColor: "#fff",
    });
    console.log("isDev", isDev);
    console.log("path.join(__dirname, '../../out/index.html')", path.join(__dirname, "../../out/index.html"));
    // Load the Next.js app
    const url = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../../out/index.html")}`;
    win.loadURL(url);
    // Inject custom CSS
    win.webContents.on("did-finish-load", () => {
        win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, "../../resources/styles.css"), "utf8"));
    });
    // Hide the menu bar (optional)
    win.setMenuBarVisibility(true);
    // Open DevTools in development
    if (isDev) {
        win.webContents.openDevTools();
    }
    // Function to change theme
    const changeTheme = (theme) => {
        switch (theme) {
            case "light":
                electron_1.nativeTheme.themeSource = "light";
                break;
            case "dark":
                electron_1.nativeTheme.themeSource = "dark";
                break;
            case "system":
                electron_1.nativeTheme.themeSource = "system";
                break;
            default:
                electron_1.nativeTheme.themeSource = "system";
                break;
        }
        console.log(`Theme changed to: ${theme}`);
    };
    // Add menu items with icons
    const menu = electron_1.Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "Preferences",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/settings.png"))
                        .resize({ width: 16, height: 16 }),
                    submenu: [
                        {
                            label: "Themes",
                            submenu: [
                                {
                                    label: "Light",
                                    type: "radio",
                                    click: () => changeTheme("light"),
                                },
                                {
                                    label: "Dark",
                                    type: "radio",
                                    click: () => changeTheme("dark"),
                                },
                                {
                                    label: "System",
                                    type: "radio",
                                    click: () => changeTheme("system"),
                                },
                            ],
                        },
                    ],
                },
                { type: "separator" },
                {
                    label: "Exit",
                    //role: "quit",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/exit.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        const choice = electron_1.dialog.showMessageBoxSync(win, {
                            type: "question",
                            buttons: ["Yes", "No"],
                            title: "Confirm",
                            message: "Are you sure you want to exit?",
                        });
                        if (choice === 0) {
                            electron_1.app.quit();
                        }
                    },
                },
            ],
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    //role: "reload",
                    accelerator: "CmdOrCtrl+R",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/reload.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        win.reload();
                    },
                },
            ],
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "Welcome",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/welcome.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        electron_1.dialog.showMessageBox(win, {
                            type: "info",
                            title: "Welcome",
                            message: "Welcome to SnapDragon Windows App!",
                            buttons: ["OK"],
                        });
                    },
                },
                {
                    label: "Documentation",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/documentation.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        electron_1.shell.openExternal("https://your-documentation-url.com");
                    },
                },
                {
                    label: "GitHub Repo",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/github.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        electron_1.shell.openExternal("https://github.com/your-repo-url");
                    },
                },
                { type: "separator" },
                {
                    label: "About",
                    icon: electron_1.nativeImage
                        .createFromPath(path.join(__dirname, "../../resources/about.png"))
                        .resize({ width: 16, height: 16 }),
                    click: () => {
                        electron_1.dialog.showMessageBox(win, {
                            type: "info",
                            title: "About",
                            message: `${appName} v${appVersion}`,
                            detail: appDescription,
                            icon: path.join(__dirname, "../../resources/icon.ico"),
                            buttons: ["OK"],
                        });
                    },
                },
            ],
        },
    ]);
    electron_1.Menu.setApplicationMenu(menu);
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map
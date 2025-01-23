import {
  app,
  BrowserWindow,
  Menu,
  dialog,
  nativeImage,
  shell,
  nativeTheme,
} from "electron";
import * as path from "path";
import * as fs from "fs";

// Set app metadata
app.setName("SnapDragon Windows App");

const isDev = process.env.NODE_ENV === "development";

// Read package.json to get app details
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8")
);
const appName = "SnapDragon Windows App";
const appVersion = packageJson.version;
const appDescription = packageJson.description;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
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
  console.log(
    "path.join(__dirname, '../../out/index.html')",
    path.join(__dirname, "../../out/index.html")
  );
  // Load the Next.js app
  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../../out/index.html")}`;

  win.loadURL(url);

  // Inject custom CSS
  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(
      fs.readFileSync(
        path.join(__dirname, "../../resources/styles.css"),
        "utf8"
      )
    );
  });

  // Hide the menu bar (optional)
  win.setMenuBarVisibility(true);

  // Open DevTools in development
  if (isDev) {
    win.webContents.openDevTools();
  }

  // Function to change theme
  const changeTheme = (theme: string) => {
    switch (theme) {
      case "light":
        nativeTheme.themeSource = "light";
        break;
      case "dark":
        nativeTheme.themeSource = "dark";
        break;
      case "system":
        nativeTheme.themeSource = "system";
        break;
      default:
        nativeTheme.themeSource = "system";
        break;
    }
    console.log(`Theme changed to: ${theme}`);
  };

  // Add menu items with icons
  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Preferences",
          icon: nativeImage
            .createFromPath(
              path.join(__dirname, "../../resources/settings.png")
            )
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
          icon: nativeImage
            .createFromPath(path.join(__dirname, "../../resources/exit.png"))
            .resize({ width: 16, height: 16 }),
          click: () => {
            const choice = dialog.showMessageBoxSync(win, {
              type: "question",
              buttons: ["Yes", "No"],
              title: "Confirm",
              message: "Are you sure you want to exit?",
            });
            if (choice === 0) {
              app.quit();
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
          icon: nativeImage
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
          icon: nativeImage
            .createFromPath(path.join(__dirname, "../../resources/welcome.png"))
            .resize({ width: 16, height: 16 }),
          click: () => {
            dialog.showMessageBox(win, {
              type: "info",
              title: "Welcome",
              message: "Welcome to SnapDragon Windows App!",
              buttons: ["OK"],
            });
          },
        },
        {
          label: "Documentation",
          icon: nativeImage
            .createFromPath(
              path.join(__dirname, "../../resources/documentation.png")
            )
            .resize({ width: 16, height: 16 }),
          click: () => {
            shell.openExternal("https://your-documentation-url.com");
          },
        },
        {
          label: "GitHub Repo",
          icon: nativeImage
            .createFromPath(path.join(__dirname, "../../resources/github.png"))
            .resize({ width: 16, height: 16 }),
          click: () => {
            shell.openExternal("https://github.com/diyakamboj");
          },
        },
        { type: "separator" },
        {
          label: "About",
          icon: nativeImage
            .createFromPath(path.join(__dirname, "../../resources/about.png"))
            .resize({ width: 16, height: 16 }),
          click: () => {
            dialog.showMessageBox(win, {
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
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

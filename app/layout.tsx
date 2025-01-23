// app/layout.tsx
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

export const metadata = {
  title: "SnapDragon Windows App",
  description:
    "This app will display an interactive playground for talking avatars as friendly and helpful agents for wildlife conservation and providing information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 bg-gray-50 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

import { Outlet, Scripts, Meta, Links, ScrollRestoration } from "react-router";
import { Toaster } from "react-hot-toast";
import "./style.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/Header";

function ToastWithTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
                <Toaster
                  position="top-right"
                  gutter={12}
                  toastOptions={{
                    duration: 1500,
                    style: {
          background: isDark ? "#2a2a2a" : "#fff",
          color: isDark ? "#e0e0e0" : "#333",
                      borderRadius: "12px",
                      padding: "14px 20px",
                      fontSize: "0.95rem",
          boxShadow: isDark
            ? "0 8px 24px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(199, 21, 133, 0.15)",
          border: isDark ? "1px solid #444" : "1px solid #fce4ec",
                    },
                    success: {
                      style: {
                        borderLeft: "4px solid #2e7d32",
                      },
                      iconTheme: {
                        primary: "#2e7d32",
                        secondary: "#fff",
                      },
                    },
                    error: {
                      style: {
                        borderLeft: "4px solid #dc3545",
                      },
                      iconTheme: {
                        primary: "#dc3545",
                        secondary: "#fff",
                      },
                    },
                  }}
                />
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="container">
                  <Outlet />
                </main>
                <footer className="footer">
                  <p>&copy; {new Date().getFullYear()} AZI Cosmetics Store. All rights reserved.</p>
                </footer>
                <ToastWithTheme />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


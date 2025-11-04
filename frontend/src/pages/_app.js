import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { QuizProvider } from "../contexts/QuizContext";
import { AdminProvider } from "../contexts/AdminContext";
import GoogleAnalytics from "../components/GoogleAnalytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // If no token and trying to access protected routes, redirect to login
    if (!token && router.pathname === "/profile") {
      router.push("/login");
    }

    // If user is authenticated and on login/signup page, redirect to home page
    if (
      token &&
      user &&
      (router.pathname === "/login" || router.pathname === "/signup")
    ) {
      router.push("/");
    }

    setIsLoading(false);
  }, [router.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <AdminProvider>
            <GoogleAnalytics />
            <Component {...pageProps} />
          </AdminProvider>
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;

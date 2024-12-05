import { ReduxProvider } from "@/lib/redux/redux-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <ReduxProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ProgressBar
          height="4px"
          color="#001c46"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          transition={Slide}
        />
      </ReduxProvider>
    </main>
  );
}

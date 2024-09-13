import { ReduxProvider } from "@/lib/redux/redux-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import { SessionProvider } from "next-auth/react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export default function App({ Component, pageProps:{ session, ...pageProps } }) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <ReduxProvider>
      <SessionProvider session={session}>
      <Component {...pageProps} />
      </SessionProvider>
      <ProgressBar
        height="4px"
        color="#001c46"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ToastContainer />
      </ReduxProvider>
    </main>
  );
}

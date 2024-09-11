import { ReduxProvider } from "@/lib/redux/redux-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <ReduxProvider>
      <Component {...pageProps} />
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

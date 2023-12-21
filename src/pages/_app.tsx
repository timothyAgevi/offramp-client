import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Aurora, AuroraTestnet, Mumbai } from "@thirdweb-dev/chains";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AppProvider from "../providers/AppProvider";
import Navigation from "@/components/Navigation";

export const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        {/* <ThirdwebProvider
        activeChain={Mumbai}
        clientId="434cf26a9ccd1e5a147968c5ef73d35e"
      > */}
        <Navbar />
        <div
          style={{
            height: "80px",
          }}
        > </div>
        <Navigation />

        <Component {...pageProps} />
      </AppProvider>
      {/* </ThirdwebProvider> */}
    </ThemeProvider>
  );
}

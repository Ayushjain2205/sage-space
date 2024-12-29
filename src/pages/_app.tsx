import "../styles/globals.css";
import { permanentMarker, spaceGrotesk, outfit } from "../lib/fonts";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${permanentMarker.variable} ${spaceGrotesk.variable} ${outfit.variable}`}
    >
      <ThirdwebProvider>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </main>
  );
}

export default MyApp;

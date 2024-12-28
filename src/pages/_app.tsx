import "../styles/globals.css";
import { permanentMarker, spaceGrotesk, outfit } from "../lib/fonts";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${permanentMarker.variable} ${spaceGrotesk.variable} ${outfit.variable}`}
    >
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;

import "../styles/globals.css";
import { permanentMarker, spaceGrotesk, outfit } from "../lib/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <main
      className={`${permanentMarker.variable} ${spaceGrotesk.variable} ${outfit.variable}`}
    >
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;

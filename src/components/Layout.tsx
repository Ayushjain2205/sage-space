import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>SageSpace</title>
        <meta name="description" content="Your AI Companions, Tokenized" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}

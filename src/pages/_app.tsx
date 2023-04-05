import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import Head from "next/head";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta
          name="theme-color"
          content="#2e026d"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#2e026d"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Snippy" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

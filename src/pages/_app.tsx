import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

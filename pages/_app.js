import "../styles/globals.css";
import { Fragment } from "react";

import Navigation from "../components/navigation/Navigation";

import { SessionProvider } from "next-auth/react"



/**

    in order to use our navigation component, we need to import fragments,
    because our nav is going to be on every page
 */

export default function App({ Component, pageProps }) {
  return (

    // specify the session property, and you get the session property from the pageProps
    <SessionProvider SessionProvider session={pageProps.session}>
      <Navigation />
      <Component {...pageProps} />
    </SessionProvider>

  );
}

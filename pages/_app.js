import "../styles/globals.css";
import { Fragment } from "react";

import Navigation from "../components/navigation/Navigation";

/**

    in order to use our navigation component, we need to import fragments,
    because our nav is going to be on every page
 */

export default function App({ Component, pageProps }) {
  return (

    <Fragment>
      <Navigation />
      <Component {...pageProps} />
    </Fragment>

  );
}

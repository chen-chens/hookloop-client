import React from "react";
// 順序很重要!!
import "../styles/globals.css";
import "../../public/antd.min.css";
import type { AppProps } from "next/app";
import withTheme from "../../theme/index";

export default function App({ Component, pageProps }: AppProps) {
  return withTheme(<Component {...pageProps} />);
}

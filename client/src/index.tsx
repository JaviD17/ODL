/* @refresh reload */
import { render } from "solid-js/web";
import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";

import "./index.css";
import App from "./App";

const config: HopeThemeConfig = {
  initialColorMode: "dark",
  darkTheme: {
    colors: {
      bg1: "#000000",
      bg2: "#52057B",
      pr1: "#BC6FF1",
      pr2: "#892CDC",
    },
  },
};

render(
  () => (
    <HopeProvider config={config}>
      <App />
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement
);

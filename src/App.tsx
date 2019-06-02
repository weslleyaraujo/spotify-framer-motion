import React from "react";
import { Global } from "@emotion/core";
import { globalStyles } from "./global-styles";
import { Providers } from "./Providers";
import { Home } from "./screens/Home";
import { Search } from "./screens/Search";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Providers>
        <Home path="/" />
        <Search path="/search" />
      </Providers>
    </>
  );
}

export default App;

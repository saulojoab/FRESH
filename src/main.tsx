import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import GlobalTheme from "@/global/theme";
import GlobalStyle from "@/global/styles";
import * as SCREENS from "./screens";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SCREENS.Welcome />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/home",
    element: <SCREENS.Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/settings",
    element: <SCREENS.Settings />,
    errorElement: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={GlobalTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

import { type FC } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../Navbar";
import { ThemeContextProvider } from "../../context/ThemeProvider";
import Theme from "../../context/Theme";
import "../../index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const AppLayout: FC = () => {
  return (
    <>
      {/* Header */}
      <ToastContainer />
      <ThemeContextProvider>
          <Theme>
            <Navbar />
            {/* <Dashboard /> */}
            <main>
              <Outlet />
            </main>
          </Theme>
      </ThemeContextProvider>
      {/* Footer */}
    </>
  );
};

import React, { ReactNode } from "react";
import Navbar from "../navbar/navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main>{children}</main>
    </>
  );
};

export default Layout;

import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUpPage,
  PricingPage,
  FilePage,
  CodingPage,
  ProfilePage,
} from "./pages/ExportPages";
import { FileProvider } from "./utils/context/FileContext";
import SearchFilePage from "pages/SearchFilePage";

const App = () => {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <FileProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/subscribe" element={<PricingPage />} />
        <Route path="/coding/:id" element={<CodingPage />} />
        <Route path="/file" element={<FilePage />} />
        <Route path="/search-files" element={<SearchFilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </FileProvider>
  );
};

export default App;

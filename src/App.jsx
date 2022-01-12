import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// react/function-component-definition
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Routes from "./Routes";
import Head from "./Components/head/Head";

function App() {
  const [siteTitle, setSiteTitle] = useState(null);
  const [siteContent, setSiteContent] = useState(null);

  return (
    <Router>
      <Head title={siteTitle} content={siteContent} />
      <Header />
      <div className="page">
        <Routes
          setSiteTitle={setSiteTitle}
          setSiteContent={setSiteContent}
        />
      </div>
      <Footer />
    </Router>
  );
}
export default App;

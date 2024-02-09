import React from "react";
import img from "assets/img/illustration-home.png";
import "styles/Home.scss";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="home-main-container">
      <h1>CreativeCode</h1>
      <div id="Accueil" className="home">
        <div className="img-container">
          <img src={img} alt="Illustration page d'accueil" />
        </div>
        <div className="container">
          <div className="content-container">
            <h2 className="main-title">
              Le code a du style avec CreativeCode !
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum rhoncus.commodo velit. Vivamus iaculis varius accumsan.
              Nunc
            </p>
            <div className="link-container">
              <Link to="sign-up">
                <button className="button-start">Commencer</button>
              </Link>
              <Link className="learn-more" to="#Pricing">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

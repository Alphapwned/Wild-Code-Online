import React from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="container-pricing-home">
      <h4 id="Pricing" className="title">
        Pricing
      </h4>
      <div className="container-card-hexagon">
        <div className="container-pricing-card-border">
          <div className="container-pricing-card">
            <p className="title-card">Basique</p>
            <div className="price">
              <p>
                0<span className="devise">€</span>
              </p>
            </div>
            <Link to={"/subscribe"}>En savoir plus</Link>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              praesentium.
            </p>
          </div>
        </div>

        {/* deuxième card */}

        <div className="container-pricing-card-border container-pricing-card-border-2">
          <div className="container-pricing-card container-pricing-card-2">
            <p className="title-card">Expert</p>
            <div className="price">
              <p>
                9,99<span className="devise">€</span> <span>/mois</span>
              </p>
            </div>
            <Link to={"/subscribe"}>En savoir plus</Link>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              praesentium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

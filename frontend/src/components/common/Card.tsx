import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface ICardInfo {
  title: string;
  price: string;
  btn: string;
  type: string;
  services: string[];
}
const Card = (info: ICardInfo) => {
  return (
    <div className="container-card">
      <div className="border-top"></div>
      <h4 className="title">{info.title}</h4>
      <div className="container-pricing">
        <p className="price">
          {info.price}
          <span className="devise">€</span>
          <span> / mois</span>
        </p>
      </div>
      <Link to={`/sign-up?type=${info.type}`}>{info.btn}</Link>
      <hr />
      <div className="container-info">
        {info.services.map((info, index) => (
          <div key={index} className="content-info">
            <FontAwesomeIcon icon={faCheck} />
            <p>{info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

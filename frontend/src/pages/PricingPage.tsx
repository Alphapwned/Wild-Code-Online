import React from "react";
import Card from "components/common/Card";
import { dataCard } from "utils/dataCard";
import "styles/PricingPage.scss";
import Layout from "components/common/layouts/Layout";

const PricingPage = () => {
  return (
    <>
      <Layout>
        <div className="container-pricingPage-card">
          {dataCard.map((info, index) => (
            <Card
              title={info.title}
              price={info.price}
              btn={info.btn}
              type={info.type}
              services={info.infoServices}
            />
          ))}
          <div className="container-background-pricingPage"></div>
        </div>
      </Layout>
    </>
  );
};

export default PricingPage;

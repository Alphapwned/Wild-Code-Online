import Layout from "components/common/layouts/Layout";
import HomePage from "components/common/HomePage";
import AboutUs from "components/common/AboutUs";
import "styles/AboutUs.scss";
import "styles/components/Pricing.scss";
import Pricing from "components/common/Pricing";
import ContactForm from "components/common/form/FormContact";

const Home = () => {
  return (
    <Layout>
      <div className="mainHome">
        <HomePage />
        <Pricing />
        <AboutUs />
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Home;

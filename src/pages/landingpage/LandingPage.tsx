import Banner from "./elements/Banner";
import Faqs from "./elements/Faqs";
import Footer from "./elements/Footer";
import Header from "./elements/Header";
import OurService from "./elements/OurService";
import Startups from "./elements/Startups";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <OurService />
      <Startups  title={'Investors'}/>
      <Startups title={'Startups'} />
      <Faqs />
      <Footer />
    </div>
  );
};

export default LandingPage;

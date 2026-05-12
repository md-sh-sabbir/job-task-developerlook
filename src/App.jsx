import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner/Banner";
import Brands from "./components/Brands";
import ContentSection from "./components/ContentSection";
import FeaturedWork from "./components/FeaturedWork";
import OurServices from "./components/OurServices";
import Consumers from "./components/Consumers";
import ScrollCard from "./components/ScrollCard";
import WhatsNew from "./components/WhatsNew";
import ReadyToRise from "./components/ReadyToRise";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Banner></Banner>
        <Brands></Brands>
        <ContentSection></ContentSection>
        <FeaturedWork></FeaturedWork>
        <OurServices></OurServices>
        <Consumers></Consumers>
        <ScrollCard></ScrollCard>
        <WhatsNew></WhatsNew>
        <ReadyToRise></ReadyToRise>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}

export default App;

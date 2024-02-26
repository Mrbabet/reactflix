import axios from "axios";

import SearchBar from "../../components/SearchBar/SearchBar";
import Trending from "../../components/Trending/Trending";
import Section from "../../components/Section/Section";
import FreeToWatch from "../../components/FreeToWatch/FreeToWatch";
import Popular from "../../components/Popular/Popular";
import Trailers from "../../components/Trailers/Trailers";

const Home = () => {
  return (
    <>
      <SearchBar />
      <Section title="Trending">
        <Trending />
      </Section>
      <Section title="Lastest Trailers">
        <Trailers />
      </Section>
      <Section title="What's Popular">
        <Popular />
      </Section>
      <Section title="Free To Watch">
        <FreeToWatch />
      </Section>
    </>
  );
};

export default Home;

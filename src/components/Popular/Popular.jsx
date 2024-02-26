import { useState, useEffect } from "react";

import MovieCard from "../MovieCard/MovieCard";
import {
  Grid,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
  Box,
} from "@chakra-ui/react";

import axios from "axios";

const Popular = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("movie");
  const [monetizationType, setMonetizationType] = useState("flatrate");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${selectedTab}`,
          {
            params: {
              language: "en-US",
              page: "1",
              sort_by: "popularity.desc",
              watch_region: "PL",
              with_watch_monetization_types: monetizationType,
            },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_AUTH}`,
            },
          }
        );

        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedTab, monetizationType]);

  const handleTabChange = (index) => {
    let selectedCategory;
    let monetizationType;
    switch (index) {
      case 0:
        selectedCategory = "movie";
        monetizationType = "flatrate";
        break;
      case 1:
        selectedCategory = "tv";
        break;
      case 2:
        selectedCategory = "movie";
        monetizationType = "rent";
        break;
      default:
        selectedCategory = "movie";
        break;
    }
    setSelectedTab(selectedCategory);
    setMonetizationType(monetizationType);
  };

  return (
    <>
      {error && <Box color="red">{error}</Box>}

      <Tabs onChange={handleTabChange}>
        <TabList>
          <Tab>Streaming</Tab>
          <Tab>Tv</Tab>
          <Tab>For Rent</Tab>
        </TabList>
        {loading && (
          <Spinner size="xl" thickness="4px" color="teal.500" margin="auto" />
        )}
        <TabPanels>
          {!loading && !error && (
            <TabPanel className="test">
              <Grid
                templateColumns="repeat(20, 220px)"
                overflowX={"scroll"}
                gap={"16px"}
              >
                {data.map((movie) => {
                  return (
                    <MovieCard
                      id={movie.id}
                      year={movie.release_date}
                      mediaType={movie.media_type}
                      rating={movie.vote_average}
                      imageUrl={movie.poster_path}
                      title={movie.title || movie.name}
                      key={movie.id}
                    />
                  );
                })}
              </Grid>
            </TabPanel>
          )}
          {!loading && !error && (
            <TabPanel>
              <Grid
                templateColumns="repeat(20, 220px)"
                overflowX={"scroll"}
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <MovieCard
                      year={movie.first_air_date}
                      mediaType={movie.media_type}
                      rating={movie.vote_average}
                      imageUrl={movie.poster_path}
                      title={movie.name}
                      key={movie.id}
                    />
                  );
                })}
              </Grid>
            </TabPanel>
          )}
          {!loading && !error && (
            <TabPanel>
              <Grid
                templateColumns="repeat(20, 220px)"
                overflowX={"scroll"}
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <MovieCard
                      year={movie.first_air_date}
                      mediaType={movie.media_type}
                      rating={movie.vote_average}
                      imageUrl={movie.poster_path}
                      title={movie.name}
                      key={movie.id}
                    />
                  );
                })}
              </Grid>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Popular;

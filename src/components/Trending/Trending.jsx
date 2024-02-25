import { useState, useEffect } from "react";

import MovieCard from "../MovieCard/MovieCard";
import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
  Box,
  Grid,
} from "@chakra-ui/react";

import axios from "axios";

const Trending = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${selectedTab}?language=en-US&page=1`,
          {
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
  }, [selectedTab]);

  const handleTabChange = (index) => {
    setSelectedTab(index === 0 ? "day" : "week");
  };

  return (
    <>
      {error && <Box color="red">{error}</Box>}

      <Tabs onChange={handleTabChange}>
        <TabList>
          <Tab>Day</Tab>
          <Tab>Week</Tab>
        </TabList>
        {loading && (
          <Spinner size="xl" thickness="4px" color="teal.500" margin="auto" />
        )}
        <TabPanels>
          {!loading && !error && (
            <TabPanel>
              <Grid
                overflowX={"scroll"}
                templateColumns="repeat(20, 220px)"
                gap={"16px"}
              >
                {data.map((movie) => {
                  return (
                    <MovieCard
                      id={movie.id}
                      year={movie.release_date || movie.first_air_date}
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
                overflowX={"scroll"}
                templateColumns="repeat(20, 220px)"
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <MovieCard
                      id={movie.id}
                      year={movie.release_date || movie.first_air_date}
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
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Trending;

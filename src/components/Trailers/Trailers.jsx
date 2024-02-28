import React from "react";

import { useState, useEffect } from "react";

import TrailerCard from '../TrailerCard/TrailerCard'
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

const Trailers = () => {
  // Trailers videos to add
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("movie");
  const [monetizationType, setMonetizationType] = useState(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
       
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${selectedTab}`,
          {
            params: {
              include_video: true,
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
          const data = response.data.results
          setData(data)
          return data.map(movie => movie.id)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLatestMovies()
    const fetchTrailersMovies = async(movieID)=>{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos`,{
        params: {
          language: "en-US",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_AUTH}`,
        },
      });

      const data =response.data.results
      
      return data.filter(video => video.type === 'Trailer' && video.official ===true)


    }
    
    async function fetchNewestVideosTrailers() {
      try {
        setLoading(true)
          const latestMovieIds = await fetchLatestMovies();
       
          if (latestMovieIds.length === 0) {
              console.log('No latest movies found');
              return;
          }
          
          for (const movieId of latestMovieIds) {
            
            const trailers = await fetchTrailersMovies(movieId)
        }
        
        setLoading(false)
         
      } catch (error) {
          console.error(error);
      }
     
  }
  fetchNewestVideosTrailers()
  }, [selectedTab, monetizationType]);

  

  const handleTabChange = (index) => {
    let selectedCategory;
    let monetizationType;
    switch (index) {
      case 0:
        selectedCategory = "movie";
        break;
      case 1:
        selectedCategory = "movie";
        monetizationType = "flatrate";
        break;
      case 2:
        selectedCategory = "tv";
        monetizationType = "";
        break;
      case 3:
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
          <Tab>Popular</Tab>
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
                templateColumns="repeat(20, 300px)"
                overflowX={"scroll"}
                gap={"16px"}
              >
                {data.map((movie) => {
                  return (
                    <TrailerCard
                      id={movie.id}
                      imageUrl={movie.backdrop_path}
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
                templateColumns="repeat(20, 300px)"
                overflowX={"scroll"}
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <TrailerCard
                      imageUrl={movie.backdrop_path}
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
                templateColumns="repeat(20, 300px)"
                overflowX={"scroll"}
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <TrailerCard
                       imageUrl={movie.backdrop_path}
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
                templateColumns="repeat(20, 300px)"
                overflowX={"scroll"}
                gap={"16px"}
                pb={"24px"}
              >
                {data.map((movie) => {
                  return (
                    <TrailerCard
                       imageUrl={movie.backdrop_path}
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

export default Trailers;

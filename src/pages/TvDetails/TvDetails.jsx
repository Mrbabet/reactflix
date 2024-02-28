import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoreInfoTopBar from "../../components/MoreInfoTopBar/MoreInfoTopBar";
import {
  Box,
  Heading,
  Image,
  List,
  Text,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
} from "@chakra-ui/react";

const TvDetails = () => {
  const url = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { tvId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_AUTH}`,
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [tvId]);

  console.log(data)
  return (
    <>
    {loading && <Spinner/>}
    {!loading && 
    <>
    <MoreInfoTopBar />
    {data.backdrop_path ? <Box
        w={"100%"}
        h={"500px"}
        filter="auto"
        brightness="40%"
        bgImage={[`url(${url}${data.backdrop_path})`]}
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize={"cover"}
      ></Box> : <Flex   w={"100%"}
      h={"500px"}
      filter="auto"
      brightness="40%"
      justifyContent={'center'}
      alignItems={'center'}
      bgSize={"cover"}>There is no backdrop image for this movie</Flex>}
      
      <Box h={"100%"} p={"30px 40px"}>
        <Heading fontSize={"16px"} textAlign={"center"} pb={"16px"}>
          {data.name} ({data.first_air_date?.slice(0, 4)})
        </Heading>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={"16px"}
          pb={"16px"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={"8px"}>
            <CircularProgress
              value={Math.floor(data.vote_average * 10)}
              color="green.400"
            >
              <CircularProgressLabel>
                {Math.floor(data.vote_average * 10)}%
              </CircularProgressLabel>
            </CircularProgress>
            User score
          </Flex>
          <Box>Watch trailer</Box>
        </Flex>
        <Flex justifyContent={"center"} flexWrap={"wrap"} gap={"8px"}>
          {/* <Box>{data.certification}</Box> */}
          <Box>{data.first_air_date}</Box>
          {data.genres?.map((genre) => (
            <Box key={genre.id}>{genre.name}</Box>
          ))}
        </Flex>
        <Box>
          <Heading
            fontSize={"16px"}
            as={"h3"}
            marginBlock={"16px"}
            fontWeight={300}
            fontStyle={"italic"}
          >
            {data.tagline}
          </Heading>
          <Heading fontSize={"16px"} as={"h3"} mb={"16px"}>
            Overview
          </Heading>
          <Text>{data.overview}</Text>
        </Box>
        <List display={'flex'} gap={'8px'}>
        {data.created_by?.map(creator =>
        <ListItem key={creator.id}>
           <a href="">{creator.name}</a>
           <Text></Text>
         </ListItem>)}
          
        </List>
      </Box>
      </>} 
     
      {/* SeriesCast comp */}
      {/* <Box as="section">
        <Heading as={"h3"}>Top billed</Heading>
        <Card>
          <CardHeader>
            <Image />
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </Box> */}
      {/* Social comp */}
      {/* Media comp */}
      {/* Recomended comp */}
    </>
  );
};

export default TvDetails;

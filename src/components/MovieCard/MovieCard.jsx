import { Heading, Box, Icon, Image } from "@chakra-ui/react";
import { IconMovies, IconTv } from "../../config/customIcons";
import { Link as ChakraLink } from "react-router-dom";

const baseUrlForImages = "https://image.tmdb.org/t/p/w220_and_h330_face";

const MovieCard = ({ title, imageUrl, year, mediaType, id }) => {
  return (
    <>
      <ChakraLink to={`movie/${id}`}>
        <Box>
          <Box>
            <Image
              borderRadius={"10px"}
              src={`${baseUrlForImages}${imageUrl}`}
              bgSize={"cover"}
            />
          </Box>

          <Box
            fontWeight={300}
            bottom={0}
            padding={"8px"}
            borderRadius={"10px"}
            w="100%"
          >
            <Box textTransform={"capitalize"}>
              {mediaType === "movie" && (
                <Icon marginRight="6px" as={IconMovies} />
              )}
              {mediaType === "tv" && <Icon marginRight="6px" as={IconTv} />}
              {mediaType}
            </Box>

            <Heading fontSize={15} fontWeight={500} pt={2}>
              {title}
            </Heading>
            <Box listStyleType="none">{year}</Box>
          </Box>
        </Box>
      </ChakraLink>
    </>
  );
};

export default MovieCard;

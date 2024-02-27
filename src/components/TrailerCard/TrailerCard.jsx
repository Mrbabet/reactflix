import React from 'react'

import { Heading, Box, Icon, Image } from "@chakra-ui/react";
import { IconMovies, IconTv } from "../../config/customIcons";
import { Link as ChakraLink } from "react-router-dom";

const baseUrlForBackdrop = 'https://media.themoviedb.org/t/p/w355_and_h200_multi_faces';

const TrailerCard = ({ title, imageUrl, year, mediaType, id }) => {
  return (
    <>
      <ChakraLink>
        <Box>
          <Box>
            <Image
              borderRadius={"10px"}
              src={`${baseUrlForBackdrop}${imageUrl}`}
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

export default TrailerCard;

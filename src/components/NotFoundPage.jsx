import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="2xl" mb={4}>Page Not Found</Heading>
      <Text fontSize="xl">The requested page could not be found.</Text>
    </Box>
  );
};

export default NotFoundPage;

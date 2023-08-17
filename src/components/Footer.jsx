import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg="gray.200" py={4}>
            <Flex justifyContent="center">
                <Text fontSize="sm" color="gray.600">
                    © 2023 Your Website. All rights reserved.
                </Text>
            </Flex>
            <Flex justifyContent="center" mt={2}>
                <Link mx={2} fontSize="sm" color="gray.600" href="#">
                    Terms of Service
                </Link>
                <Link mx={2} fontSize="sm" color="gray.600" href="#">
                    Privacy Policy
                </Link>
                <Link mx={2} fontSize="sm" color="gray.600" href="#">
                    Contact Us
                </Link>
            </Flex>
        </Box>
    );
};

export default Footer;
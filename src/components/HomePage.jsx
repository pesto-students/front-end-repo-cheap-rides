import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            navigate('/')
        }
    }, []);

    return (
        <>
            <Header />
            <Box
                minHeight="100vh"
                px={4}
                py={20}
                bgGradient="linear(to-r, teal.500, cyan.500)"
            >
                <Flex
                    direction="column"
                    align="center"
                    maxW="800px"
                    mx="auto"
                >
                    <Heading as="h1" size="xl" mb={6} textAlign="center" color="white">
                        Cheap Rides
                    </Heading>
                    <Text fontSize="lg" color="white" mb={8} textAlign="center">
                        Share rides, save money, and make new friends!
                    </Text>
                    <Button
                        as={Link} to="/find-rides"
                        colorScheme="teal"
                        size="lg"
                        mb={4}
                        width="200px"
                        _hover={{ bg: 'teal.600' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Find a ride
                    </Button>
                    <Button
                        as={Link} to="/offers"
                        variant="outline"
                        colorScheme="teal"
                        size="lg"
                        width="200px"
                        _hover={{ bg: 'teal.100' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Offer a ride
                    </Button>
                </Flex>
            </Box>
        </>
    );
};

export default HomePage;

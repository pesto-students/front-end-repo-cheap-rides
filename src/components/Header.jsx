import { Box, Flex, Heading, Button, Spacer, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    };

    const username = localStorage.getItem('NAME')
    console.log(username)

    return (
        <Box width="100%" zIndex={1} position="fixed" py={4} px={15} bg="teal.500" color="white">
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                <Image src='/Cheap_rides.png' alt="Cheap Rides Logo" boxSize={8} mr={4} />
                </Flex>
                <Flex alignItems="center">
                    <Button as={Link} to="/home" colorScheme="teal" size="md" mr={4}>
                        Home
                    </Button>
                    <Button as={Link} to="/find-rides" colorScheme="teal" size="md" mr={4}>
                        Find a Ride
                    </Button>
                    <Button as={Link} to="/offers" colorScheme="teal" size="md" mr={4}>
                        Offer a Ride
                    </Button>
                    <Button as={Link} to="/ridesOfferedByYou" colorScheme="teal" size="md" mr={4}>
                        Offered by You
                    </Button>
                    <Button as={Link} to="/booked-ride" colorScheme="teal" size="md" mr={4}>
                        Booked by You
                    </Button>
                    <Spacer />
                    <Heading as="h3" size="md" mr={4}>
                        Welcome, {username}
                    </Heading>
                    <Button colorScheme="teal" size="md" onClick={handleLogout}>
                        Logout
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;

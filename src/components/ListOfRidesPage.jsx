import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const ListOfRidesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      navigate('/');
    }
  }, []);

  const [rides, setRides] = useState([]);
  const location = useLocation();
  const searchData = location.state ? location.state.searchData : [];
  const userId = localStorage.getItem('ID');
  const number = localStorage.getItem('NUMBER');

  useEffect(() => {
    setRides(searchData);
  }, [searchData]);

  const bookRide = (rideId, departure, destination, date, seats) => {
    const userId = localStorage.getItem('ID');
    console.log("userId:", userId);

    const requestData = { userId };
    console.log("Request Data:", requestData);

    return axios
      .post(`https://cheap-rides.onrender.com/booked/${rideId}/book`, requestData)
      .then((response) => {
        // Handle the successful booking
        console.log(response.data.message);
        const message = `Hi, I want to book a ride from ${departure} to ${destination} on ${date}`;
        const whatsappLink = `https://wa.me/+${number}/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
      })
      .catch((error) => {
        // Handle the booking error
        console.error(error);
      });
  };

  const handleBookRide = (rideId, departure, destination, date, seats) => {
    // Call the backend API to book the ride
    bookRide(rideId, departure, destination, date, seats)
      .then(() => {
        // we can take any actions after successful booking
      })
      .catch((error) => console.error(error));
  };

  const handleGoToHomePage = () => {
    // Logic to navigate to the home page
    navigate('/home');
    console.log('Navigate to the home page');
  };

  return (
    <>
      <Header />
      <Box minHeight="100vh" py={20} px={4} bgGradient="linear(to-r, teal.500, cyan.500)">
        <Flex direction="column" align="center" maxW="600px" mx="auto" bg="white" borderRadius="lg" p={8} boxShadow="lg">
          <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
            List of Rides
          </Heading>
          {rides.map((ride) => (
            <Box key={ride._id} p={4} borderWidth={1} borderColor="gray.200" borderRadius="md" mb={4}>
              <Text fontSize="lg">Origin: {ride.departure}</Text>
              <Text fontSize="lg">Destination: {ride.destination}</Text>
              <Text fontSize="lg">Date: {new Date(ride.date).toISOString().split('T')[0]}</Text>
              <Text fontSize="lg">Available Seats: {ride.seats}</Text>
              <Text fontSize="lg">Ride cost: {ride.rs} Rs</Text>
              <Button
                colorScheme="teal"
                size="lg"
                mt={4}
                onClick={() => handleBookRide(ride._id, ride.departure, ride.destination, ride.date, ride.seats, ride.rs)}
                disabled={ride.seats === 0}
              >
                {ride.seats === 0 ? 'No Seats Available' : 'Book Ride'}
              </Button>
            </Box>
          ))}
          <Button colorScheme="teal" size="lg" mt={4} onClick={handleGoToHomePage}>
            Go to Home Page
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ListOfRidesPage;
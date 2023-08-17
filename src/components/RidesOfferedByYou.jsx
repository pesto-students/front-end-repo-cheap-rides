import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading, Button, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const RidesOfferedByYou = () => {
  const [rides, setRides] = useState([]);
  const userId = localStorage.getItem('ID'); // Get the user ID from local storage

  useEffect(() => {
    // Fetch the rides offered by the user from the backend
    const fetchRidesOfferedByUser = async () => {
      try {
        // Make a request to your backend endpoint to get the rides offered by the user
        const response = await axios.get(`https://cheap-rides.onrender.com/offers/user/${userId}`);

        // Set the fetched rides in the state
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRidesOfferedByUser();
  }, [userId]);

  // Function to handle canceling a ride
  const handleCancelRide = async (rideId) => {
    try {
      // Make a request to your backend endpoint to cancel the ride
      await axios.delete(`https://cheap-rides.onrender.com/offers/${userId}/${rideId}`);

      // Filter out the canceled ride from the state
      setRides((prevRides) => prevRides.filter((ride) => ride._id !== rideId));
    } catch (error) {
      console.error('Error canceling ride:', error);
    }
  };

  // Navigate to the ride update page
  const navigate = useNavigate(); // Initialize useNavigate
  const handleUpdateRide = (rideId) => {
    navigate(`/update-ride/${rideId}`);
  };

  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4} color="teal.500">
          Rides Offered by You
        </Heading>
        {rides.length === 0 ? (
          <Text>No rides offered by you.</Text>
        ) : (
          rides.map((ride) => (
            <Box key={ride._id} p={4} borderWidth="1px" borderRadius="md" my={2} borderColor="gray.200">
              {/* Ride details */}
              <Text fontSize="lg">
                <b>Departure:</b> {ride.departure}
              </Text>
              <Text fontSize="lg">
                <b>Destination:</b> {ride.destination}
              </Text>
              <Text fontSize="lg">
                <b>Date:</b> {ride.date}
              </Text>
              <Text fontSize="lg">
                <b>Seats:</b> {ride.seats}
              </Text>
              <Text fontSize="lg">
                <b>Car Name:</b> {ride.carName}
              </Text>

              {/* Update Ride Button */}
              <Button mt={4} colorScheme="teal" onClick={() => handleUpdateRide(ride._id)}>
                Update Ride
              </Button>

              {/* Cancel Ride Button */}
              <Button mt={2} colorScheme="red" onClick={() => handleCancelRide(ride._id)}>
                Cancel Ride
              </Button>

              <Divider my={4} />
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default RidesOfferedByYou;

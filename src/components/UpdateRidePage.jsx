import React, { useState, useEffect, useCallback } from 'react';
import { Box, Flex, Heading, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Autocomplete } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const UpdateRidePage = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState({});
  const [updatedRide, setUpdatedRide] = useState({
    departure: '',
    departureCoordinates: { type: 'Point', coordinates: [] },
    destination: '',
    destinationCoordinates: { type: 'Point', coordinates: [] },
    date: '',
    seats: '',
    rs:'',
    carName: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [departureSearchBox, setDepartureSearchBox] = useState(null);
  const [destinationSearchBox, setDestinationSearchBox] = useState(null);

  const phoneNumber = localStorage.getItem('NUMBER');
  const userId = localStorage.getItem('ID');

  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }, []);

  const debouncedHandlePlaceSelect = useCallback(
    debounce((address, isDeparture, coordinates) => {
      if (isDeparture) {
        setUpdatedRide((prevRide) => ({
          ...prevRide,
          departure: address,
          departureCoordinates: {
            type: 'Point',
            coordinates: [coordinates.lng(), coordinates.lat()],
          },
        }));
      } else {
        setUpdatedRide((prevRide) => ({
          ...prevRide,
          destination: address,
          destinationCoordinates: {
            type: 'Point',
            coordinates: [coordinates.lng(), coordinates.lat()],
          },
        }));
      }
    }, 1500),
    []
  );

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`https://cheap-rides.onrender.com/offers/${rideId}`);
        setRide(response.data);
        setUpdatedRide(response.data);
      } catch (error) {
        console.error('Error fetching ride details:', error);
      }
    };

    fetchRideDetails();
  }, [rideId]);

  const handleUpdate = async () => {
    try {
      setSuccess(''); // Clear any previous success message
      setError(''); // Reset the error state to empty before making the API call

      if (!updatedRide.departure || !updatedRide.destination || !updatedRide.date || !updatedRide.seats || !updatedRide.rs || !updatedRide.carName) {
        setError('Please fill in all fields');
        return;
      }

      if (!updatedRide.departureCoordinates || !updatedRide.destinationCoordinates) {
        setError('Please select valid departure and destination locations from the map');
        return;
      }

      const response = await axios.put(`https://cheap-rides.onrender.com/offers/${rideId}`, updatedRide);

      if (response.status === 200) {
        setSuccess('Ride updated successfully');
      }
    } catch (error) {
      console.error('Error updating ride:', error);
      setError('Failed to update ride');
    }
  };

  return (
    <>
      <Header />
      <Box minHeight="100vh" px={4} py={20} bgGradient="linear(to-r, teal.500, cyan.500)">
        <Flex
          direction="column"
          align="center"
          maxW="600px"
          mx="auto"
          bg="white"
          borderRadius="lg"
          p={8}
          boxShadow="lg"
        >
          <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
            Update Ride
          </Heading>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {success && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {success}
            </Alert>
          )}
          <LoadScript googleMapsApiKey="AIzaSyBknVPmWxcoRV_HPAQRuI1HlX_50_DBFy8" libraries={['places']}>
            <Autocomplete
              onLoad={(ref) => setDepartureSearchBox(ref)}
              onPlaceChanged={() =>
                debouncedHandlePlaceSelect(
                  departureSearchBox.getPlace().formatted_address,
                  true,
                  departureSearchBox.getPlace().geometry.location
                )
              }
            >
              <Input
                type="text"
                placeholder="Departure"
                mb={4}
                borderRadius="md"
                bg="gray.100"
                _placeholder={{ color: 'gray.500' }}
                value={updatedRide.departure}
                onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, departure: e.target.value }))}
              />
            </Autocomplete>
            <Autocomplete
              onLoad={(ref) => setDestinationSearchBox(ref)}
              onPlaceChanged={() =>
                debouncedHandlePlaceSelect(
                  destinationSearchBox.getPlace().formatted_address,
                  false,
                  destinationSearchBox.getPlace().geometry.location
                )
              }
            >
              <Input
                type="text"
                placeholder="Destination"
                mb={4}
                borderRadius="md"
                bg="gray.100"
                _placeholder={{ color: 'gray.500' }}
                value={updatedRide.destination}
                onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, destination: e.target.value }))}
              />
            </Autocomplete>
            <GoogleMap center={{ lat: 0, lng: 0 }} zoom={3}>
              {/* You can add markers or other components here if needed */}
            </GoogleMap>
          </LoadScript>
          <Input
            type="date"
            placeholder="Date"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={updatedRide.date}
            onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, date: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Number of Seats"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={updatedRide.seats}
            onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, seats: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Cost of ride in Rs"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={updatedRide.rs}
            onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, rs: e.target.value }))}
          />
          <Input
            type="text"
            placeholder="Car Name"
            mb={6}
            borderRadius="md"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            value={updatedRide.carName}
            onChange={(e) => setUpdatedRide((prevRide) => ({ ...prevRide, carName: e.target.value }))}
          />
          <Button
            colorScheme="teal"
            size="lg"
            mb={4}
            width="100%"
            _hover={{ bg: 'teal.600' }}
            _focus={{ boxShadow: 'outline' }}
            onClick={handleUpdate}
          >
            Update Ride
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default UpdateRidePage;

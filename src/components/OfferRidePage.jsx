import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Header from './Header';

const OfferRidePage = () => {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [rs, setRs] = useState('');
  const [seats, setSeats] = useState('');
  const [carName, setCarName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [departureSearchBox, setDepartureSearchBox] = useState(null);
  const [destinationSearchBox, setDestinationSearchBox] = useState(null);
  const [departureCoordinates, setDepartureCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const phoneNumber = localStorage.getItem('NUMBER');
  const userId = localStorage.getItem('ID');

  // Debounce function to delay the execution of a function
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

  // Debounced version of handlePlaceSelect function
  const debouncedHandlePlaceSelect = useCallback(
    debounce((address, isDeparture, coordinates) => {
      if (isDeparture) {
        setDeparture(address);
        setDepartureCoordinates({
          type: 'Point',
          coordinates: [coordinates.lng(), coordinates.lat()],
        });
      } else {
        setDestination(address);
        setDestinationCoordinates({
          type: 'Point',
          coordinates: [coordinates.lng(), coordinates.lat()],
        });
      }
    }, 1500),
    []
  );

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleOfferRide = async () => {
    try {
      setSuccess(''); // Clear any previous success message
      setError(''); // Reset the error state to empty before making the API call

      if (!departure || !destination || !date || !seats || !carName || !rs) {
        setError('Please fill in all fields');
        return;
      }

      if (!departureCoordinates || !destinationCoordinates) {
        setError('Please select valid departure and destination locations from the map');
        return;
      }

      const response = await axios.post('https://cheap-rides.onrender.com/offers', {
        departure,
        destination,
        date,
        // seats: Number(seats),
        seats,
        rs,
        phoneNumber,
        carName,
        departureCoordinates,
        destinationCoordinates,
        userId
      });

      if (response.status === 201) {
        setSuccess('Ride created successfully');
        setDeparture('');
        setDestination('');
        setRs('');
        setDate('');
        setSeats('');
        setCarName('');
        setDepartureCoordinates(null); // Reset the coordinates after successful creation
        setDestinationCoordinates(null); // Reset the coordinates after successful creation
      }
    } catch (error) {
      console.error(error);
      setError('Failed to create ride');
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
            Offer a Ride
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
          {/* Google Maps Integration */}
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
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
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
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
            <GoogleMap center={{ lat: 0, lng: 0 }} zoom={3}>
              {/* we can add markers or other components here if needed */}
            </GoogleMap>
          </LoadScript>
          {/* it's End of Google Maps Integration */}
          <Input
            type="date"
            placeholder="Date"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Number of Seats"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Cost of ride in Rs"
            mb={4}
            borderRadius="md"
            bg="gray.100"
            value={rs}
            onChange={(e) => setRs(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Car Name"
            mb={6}
            borderRadius="md"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
          />
          <Button
            colorScheme="teal"
            size="lg"
            mb={4}
            width="100%"
            _hover={{ bg: 'teal.600' }}
            _focus={{ boxShadow: 'outline' }}
            onClick={handleOfferRide}
          >
            Offer Ride
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default OfferRidePage;

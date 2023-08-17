import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Heading, Button } from '@chakra-ui/react';
import Header from './Header';

const BookedRidesPage = () => {
  const [bookedRides, setBookedRides] = useState([]);
  const userId = localStorage.getItem('ID'); // Getting the user ID

  useEffect(() => {
    // Fetch the booked rides for the user from the backend
    const fetchBookedRides = async () => {
      try {
        const response = await axios.get(`https://cheap-rides.onrender.com/booked/user/${userId}`);
        setBookedRides(response.data);
      } catch (error) {
        console.error('Error fetching booked rides:', error);
      }
    };

    fetchBookedRides();
  }, [userId]);

  const cancelRide = async (rideId) => {
    try {
      // Send a DELETE request to your backend endpoint to cancel the ride
      await axios.delete(`https://cheap-rides.onrender.com/cancel-ride/${rideId}/${userId}`);

      // Update the state by filtering out the canceled ride
      setBookedRides((prevRides) => prevRides.filter((ride) => ride._id !== rideId));
    } catch (error) {
      console.error('Error canceling ride:', error);
    }
  };

  return (
    <>
      <Header />
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Booked Rides
        </Heading>
        {bookedRides.length === 0 ? (
          <Text>No rides found booked by you.</Text>
        ) : (
          bookedRides.map((ride) => (
            <Box key={ride._id} p={4} borderWidth="1px" borderRadius="md" my={2}>
              <Text>
                <b>Departure:</b> {ride.departure}
              </Text>
              <Text>
                <b>Destination:</b> {ride.destination}
              </Text>
              <Text>
                <b>Date:</b> {new Date(ride.date).toLocaleDateString()}
              </Text>
              <Text>
                <b>Seats:</b> {ride.seats}
              </Text>
              <Text>
                <b>Car Name:</b> {ride.carName}
              </Text>
              <Button mt={2} colorScheme="red" onClick={() => cancelRide(ride._id)}>
                Cancel Ride
              </Button>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default BookedRidesPage;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Text, Heading, Button } from '@chakra-ui/react';
// import Header from './Header';

// const BookedRidesPage = () => {
//   const [bookedRides, setBookedRides] = useState([]);
//   const userId = localStorage.getItem('ID'); // Getting the user ID

//   useEffect(() => {
//     // Fetch the booked rides for the user from the backend
//     const fetchBookedRides = async () => {
//       try {
//         const response = await axios.get(`https://cheap-rides.onrender.com/booked/user/${userId}`);
//         setBookedRides(response.data);
//       } catch (error) {
//         console.error('Error fetching booked rides:', error);
//       }
//     };

//     fetchBookedRides();
//   }, [userId]);

//   const cancelRide = async (rideId) => {
//     try {
//       // Send a DELETE request to your backend endpoint to cancel the ride
//       await axios.delete(`https://cheap-rides.onrender.com/cancel-ride/${rideId}/${userId}`);

//       // Update the state by filtering out the canceled ride
//       setBookedRides((prevRides) => prevRides.filter((ride) => ride._id !== rideId));
//     } catch (error) {
//       console.error('Error canceling ride:', error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Box p={4}>
//         <Heading as="h2" size="lg" mb={4}>
//           Booked Rides
//         </Heading>
//         {bookedRides.map((ride) => (
//           <Box key={ride._id} p={4} borderWidth="1px" borderRadius="md" my={2}>
//             <Text>
//               <b>Departure:</b> {ride.departure}
//             </Text>
//             <Text>
//               <b>Destination:</b> {ride.destination}
//             </Text>
//             <Text>
//               <b>Date:</b> {new Date(ride.date).toLocaleDateString()}
//             </Text>
//             <Text>
//               <b>Seats:</b> {ride.seats}
//             </Text>
//             <Text>
//               <b>Car Name:</b> {ride.carName}
//             </Text>
//             <Button mt={2} colorScheme="red" onClick={() => cancelRide(ride._id)}>
//               Cancel Ride
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default BookedRidesPage;


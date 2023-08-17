import { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Alert, AlertIcon, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    try {
      if (!fullName || !email || !password || !phoneNumber) {
        setError('Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        setError('Invalid email format');
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character');
        return;
      }

      const response = await axios.post('https://cheap-rides.onrender.com/signup', {
        fullName,
        email,
        password,
        phoneNumber: `${countryCode}${phoneNumber}`, // Include the country code
      });

      if (response.status === 201) {
        // Perform any necessary actions after successful signup
        setSuccessMessage('Sign up successful! Redirecting to the home page...');
        // Clear the form after a successful signup
        setFullName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000); // 2 seconds
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Box minHeight="100vh" py={20} px={4} bgGradient="linear(to-r, teal.500, cyan.500)">
      <Flex
        direction="column"
        align="center"
        maxW="400px"
        mx="auto"
        bg="white"
        borderRadius="lg"
        p={8}
        boxShadow="lg"
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
          Sign Up
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        <Flex direction="column" mb={4}>
          <Input
            type="text"
            placeholder="Full Name"
            borderRadius="md"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Flex>
        <Flex direction="column" mb={4}>
          <Flex mb={6}>
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              w="80px"
              bg="gray.100"
              borderRadius="md"
              _focus={{ boxShadow: 'outline' }}
              mr={2}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+86">+86 (China)</option>
              <option value="+33">+33 (France)</option>
              {/* Add more country codes as needed */}
            </Select>
            <Input
              type="text"
              placeholder="Phone Number"
              flex="1"
              borderRadius="md"
              bg="gray.100"
              _placeholder={{ color: 'gray.500' }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Flex>
        </Flex>
        <Flex direction="column" mb={4}>
          <Input
            type="email"
            placeholder="Email Address"
            borderRadius="md"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>
        <Flex direction="column" mb={6}>
          <Input
            type="password"
            placeholder="Password"
            borderRadius="md"
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>
        <Button
          colorScheme="teal"
          size="lg"
          mb={4}
          _hover={{ bg: 'teal.600' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          as={Link} to="/"
          variant="outline"
          colorScheme="teal"
          size="lg"
          _hover={{ bg: 'teal.100' }}
          _focus={{ boxShadow: 'outline' }}
        >
          Already have an account? Sign In
        </Button>
      </Flex>
    </Box>
  );
};

export default SignUp;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password');
                return;
            }

            const response = await axios.post('https://cheap-rides.onrender.com/signin', {
                email,
                password
            });

            if (response.status === 200) {
                // Perform necessary actions after successful login
                navigate('/home'); // Navigate to the home page 
                localStorage.setItem('TOKEN', response.data.token);
                localStorage.setItem('NAME', response.data.fullName);
                localStorage.setItem('ID', response.data.id);
                localStorage.setItem('NUMBER', response.data.phoneNumber);
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
                    Login
                </Heading>
                {error && (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <Box width="100%">
                    <Input
                        type="email"
                        placeholder="Email Address"
                        mb={4}
                        borderRadius="md"
                        bg="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box width="100%">
                    <Input
                        type="password"
                        placeholder="Password"
                        mb={6}
                        borderRadius="md"
                        bg="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Button
                    colorScheme="teal"
                    size="lg"
                    width="100%"
                    mb={4}
                    _hover={{ bg: 'teal.600' }}
                    _focus={{ boxShadow: 'outline' }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Button
                    as={Link} to="/signup"
                    variant="outline"
                    colorScheme="teal"
                    size="lg"
                    width="100%"
                    _hover={{ bg: 'teal.100' }}
                    _focus={{ boxShadow: 'outline' }}
                >
                    Create an Account
                </Button>
            </Flex>
        </Box>
    );
};

export default Login;

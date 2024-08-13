import axios from 'axios'; // Import axios to fetch CSRF token
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import { BASE_URL } from '../constants';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState(''); // State to store the CSRF token

  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    // Fetch CSRF token when the component mounts
    const fetchCSRFToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/users/get-csrf-token`, {
          withCredentials: true, // Include credentials (cookies)
        });
        setCsrfToken(response.data.csrfToken);
        console.log('CSRF Token fetched:', response.data.csrfToken); // Log CSRF token
      } catch (error) {
        console.log('Error fetching CSRF token:', error);
      }
    };
    fetchCSRFToken();
  }, []);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordStrengthMessage('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
    } else {
      setPasswordStrengthMessage('');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailValidationMessage('Please enter a valid email address.');
    } else {
      setEmailValidationMessage('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('Submitting form with:', { name, email, password, csrfToken }); // Log form data

    validatePassword(password);
    validateEmail(email);

    if (passwordStrengthMessage || emailValidationMessage) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } else {
      try {
        const res = await register({ name, email, password, csrfToken }).unwrap();
        console.log('Registration response:', res); // Log response from register mutation
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('Registration successful. Welcome!');
      } catch (error) {
        console.log('Registration error:', error); // Log any errors
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <Meta title={'Register'} />
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type='text'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type='email'
            placeholder='Enter email'
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            isInvalid={!!emailValidationMessage}
          />
          <Form.Control.Feedback type='invalid'>
            {emailValidationMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              isInvalid={!!passwordStrengthMessage}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
            <Form.Control.Feedback type='invalid'>
              {passwordStrengthMessage}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={password !== confirmPassword}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id='toggleConfirmPasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
            <Form.Control.Feedback type='invalid'>
              Passwords do not match.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button className='mb-3 w-100' variant='warning' type='submit' disabled={isLoading}>
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className=' mx-2'>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

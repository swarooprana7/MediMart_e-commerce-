import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Alert, Spinner } from 'react-bootstrap';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setMessage('Invalid verification link.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/auth/verify-email?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error?.response?.data?.message || 'An error occurred during verification.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location.search]);

  const handleRedirect = () => {
    history('/login');
  };

  return (
    <Container className="text-center mt-5">
      <h1>Email Verification</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
            {message}
          </Alert>
          {message === 'Email verified successfully!' && (
            <Button onClick={handleRedirect} variant="primary">
              Go to Login
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;

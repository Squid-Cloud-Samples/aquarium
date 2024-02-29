import Aquarium from './components/aquarium';
import NavBar from './components/nav-bar';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

function App() {
  // Set state of toast message
  const [toastOpen, setToastOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Get Auth0 authentication state
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { setAuthProvider } = useSquid();

  useEffect(() => {
    console.log(user);

    setAuthProvider({
      integrationId: 'Auth0',
      getToken: async () => {
        if (!user) return undefined;
        return getAccessTokenSilently();
      },
    });
    if (isLoading) return;
    if (!user) {
      setLoginMessage('You are logged out!');
      setToastOpen(true);
    } else {
      setLoginMessage('You are logged in!');
      setToastOpen(true);
    }
  }, [user, isLoading, getAccessTokenSilently, setAuthProvider]);

  const handleToClose = () => {
    setToastOpen(false);
  };

  return (
    <>
      <NavBar isAuthenticated={!!user} />
      {!!user && <Aquarium />}
      <Snackbar
        open={toastOpen}
        onClose={handleToClose}
        autoHideDuration={6000}
      >
        <Alert severity='success'>{loginMessage}</Alert>
      </Snackbar>
    </>
  );
}

export default App;

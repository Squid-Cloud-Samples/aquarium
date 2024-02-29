import { SquidContextProvider } from '@squidcloud/react';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;
const audience = process.env.AUDIENCE;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={domain!}
    clientId={clientId!}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: audience,
    }}
  >
    <SquidContextProvider
      options={{
        appId: process.env.SQUID_APP_ID!,
        region: 'us-east-1.aws',
        environmentId: 'dev',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>
);

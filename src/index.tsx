import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, concat, HttpLink } from '@apollo/client';
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';


// retry https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests

const httpLink = new HttpLink({
  uri: 'http://localhost:5555/graphql',
  credentials: "include"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext({
      headers: {
        "Authorization": `bearer ${accessToken}`,
      }
    });
  }
  return forward(operation);
})

const customeLink = ApolloLink.from([
  new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()
      if (!token) {
        return true
      }
      try {
        const { exp } = jwtDecode<JwtPayload>(token);
        if (!exp) {
          return false
        }
        if (Date.now() >= exp * 1000) {
          console.log('access token exipred [client]')
          return false
        } else {
          return true
        }
      } catch (err) {
        return false
      }
    },
    fetchAccessToken: () => {
      console.log('trying to get new access token [Client]')
      return fetch('http://localhost:5555/refresh_token', { credentials: 'include', method: "POST" })
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      // full control over handling token fetch Error
      console.warn('Your refresh token is invalid. Try to relogin');
      console.log(err);

      // your custom action here
      // user.logout();
    }
  }),
  concat(authMiddleware, httpLink)
])
const client = new ApolloClient({
  link: customeLink,
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store} >
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


//  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<SignIn />}
          />
          <Route
            path="/SignUp"
            element={<SignUp />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App;

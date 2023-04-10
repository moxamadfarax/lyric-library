import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

let exampleLibraries = [
  {
    id: 1,
    libraryName: 'rap songs',
    songs: [
      {
        id: 1,
        trackName: 'rap song 1',
        songPhoto: 'photo 1'
      },
      {
        id: 2,
        trackName: 'rap song 2',
        songPhoto: 'photo 2'
      },
      {
        id: 3,
        trackName: 'rap song 3',
        songPhoto: 'photo 3'
      },
    ]
  },
  {
    id: 2,
    libraryName: 'rock songs',
    songs: [
      {
        id: 1,
        trackName: 'rock song 1',
        songPhoto: 'photo 1'
      },
      {
        id: 2,
        trackName: 'rock song 2',
        songPhoto: 'photo 2'
      },
      {
        id: 3,
        trackName: 'rock song 3',
        songPhoto: 'photo 3'
      },
    ]
  },
  {
    id: 3,
    libraryName: 'pop songs',
    songs: [
      {
        id: 1,
        trackName: 'pop song 1',
        songPhoto: 'photo 1'
      },
      {
        id: 2,
        trackName: 'pop song 2',
        songPhoto: 'photo 2'
      },
      {
        id: 3,
        trackName: 'pop song 3',
        songPhoto: 'photo 3'
      },
    ]
  },
]

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/Profile"
            element={<SignIn />}
          />
          <Route
            path="/SignUp"
            element={<SignUp />}
          />
          <Route
            path="/"
            element={<Profile libraries={exampleLibraries}/>}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App;

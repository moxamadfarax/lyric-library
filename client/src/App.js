import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Test from "./pages/test";
import Search from "./pages/Search";
import Library from "./pages/Library";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/test" element={<Test />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/:id" element={<Library />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Library from "./pages/Library";

const client = new ApolloClient({
  uri: "https://lyric-library.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  status400ForVariableCoercionErrors: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Search />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/:id" element={<Library />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

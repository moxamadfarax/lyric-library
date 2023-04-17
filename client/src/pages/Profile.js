import * as React from "react";
import { Box } from "@mui/material";
import { useQuery } from '@apollo/client';

import Navbar from "../components/Navbar";
import Libraries from "../components/Libraries";
import { GET_USER_LIBRARIES } from '../utils/query'
import authService from "../utils/auth";

export default function Profile() {
  const userId = authService.getProfile();
  const { loading, data } = useQuery(GET_USER_LIBRARIES, {
    variables: { id: userId.data._id },
  });
  console.log(data);
  return (
    <Box
      sx={{
        display: "flex;",
        flexDirection: "column;",
        minHeight: "100vh;",
      }}
    >{loading ? (
      <Box>...Loading</Box>
    ) : (
      
      <Box  sx={{
        display: "flex;",
        flexDirection: "column;",
        minHeight: "100vh;",
      }}> 
        <Navbar username={"Example Username"} />
        <Libraries libraries={data.getUserById.libraries} />
      </Box>)}
    </Box>
  );
}

 

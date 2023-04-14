import * as React from "react";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";

import Navbar from "../components/Navbar";
import Libraries from "../components/Libraries";
import { GET_ALL_LIBRARIES } from "../utils/query";

export default function Profile() {
  const libraries = useQuery(GET_ALL_LIBRARIES);

  return (
    <Box
      sx={{
        display: "flex;",
        flexDirection: "column;",
        minHeight: "100vh;",
      }}
    >
      {libraries.loading ? (
        <Box>...Loading</Box>
      ) : (
        <Box
          sx={{
            display: "flex;",
            flexDirection: "column;",
            minHeight: "100vh;",
          }}
        >
          <Navbar username={"Example Username"} />
          <Libraries libraries={libraries.data.getAllLibraries} />
        </Box>
      )}
    </Box>
  );
}

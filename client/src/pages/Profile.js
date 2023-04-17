import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import Libraries from "../components/Libraries";
import { GET_USER_LIBRARIES } from "../utils/query";
import authService from "../utils/auth";
import { CREATE_LIBRARY } from "../utils/mutation";
import { useState } from "react";

function Profile() {
  if (authService.getProfile() === null) {
    window.location.assign("/");
  }
  const userId = authService.getProfile();
  const username = userId.data.username;
  console.log(username);
  console.log(userId.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data } = useQuery(GET_USER_LIBRARIES, {
    variables: { id: userId.data._id },
  });

  const [createLibrary] = useMutation(CREATE_LIBRARY);

  const handleCreateLibrary = async (libraryName) => {
    try {
      await createLibrary({
        variables: {
          userId: userId.data._id,
          input: {
            name: libraryName,
          },
        },
      });
      console.log("library created");
    } catch (err) {
      console.log(err);
      console.log("error");
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (!userId) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <Box>...Loading</Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar username={`Welcome ${username}`} />
          <Libraries libraries={data.getUserById.libraries} />
          <Button onClick={handleModalOpen}>Create Library</Button>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                id="library-name"
                label="Library Name"
                variant="outlined"
                sx={{ marginBottom: "10px" }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  handleCreateLibrary(
                    document.getElementById("library-name").value
                  );
                  handleModalClose();
                }}
              >
                Create New Library
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
}

export default Profile;

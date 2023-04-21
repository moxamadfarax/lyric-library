import { gql } from "@apollo/client";

export const GET_LIBRARY_BY_ID = gql`
  query Query($id: ID!) {
    getLibraryById(id: $id) {
      _id
      name
      songs {
        artistName
        lyrics
        trackName
        songPhoto
        _id
      }
    }
  }
`;

export const GET_USER_LIBRARIES = gql`
  query Query($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
      libraries {
        _id
        name
      }
    }
  }
`;

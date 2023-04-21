import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_LIBRARY = gql`
  mutation CreateLibrary($userId: ID!, $input: CreateLibraryInput!) {
    createUserLibrary(userId: $userId, input: $input) {
      name
    }
  }
`;

export const UPDATE_LIBRARY_NAME = gql`
  mutation updateLibraryName($id: ID!, $name: String!) {
    updateLibraryName(id: $id, name: $name) {
      _id
      name
      songs {
        _id
        trackName
        artistName
        songPhoto
        lyrics
      }
    }
  }
`;

export const DELETE_LIBRARY = gql`
  mutation Mutation($id: ID!) {
    deleteLibrary(id: $id) {
      name
    }
  }
`;

export const ADD_SONG_TO_LIBRARY = gql`
  mutation Mutation($libraryId: ID!, $input: CreateSongInput!) {
    addSongToLibrary(libraryId: $libraryId, input: $input) {
      _id
      name
      songs {
        _id
        trackName
      }
    }
  }
`;

export const REMOVE_SONG_FROM_LIBRARY = gql`
  mutation Mutation($libraryId: ID!, $songId: ID!) {
    removeSongFromLibrary(libraryId: $libraryId, songId: $songId) {
      _id
    }
  }
`;

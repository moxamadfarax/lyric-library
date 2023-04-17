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
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_LIBRARY = gql`
  mutation Mutation($userId: ID!, $input: CreateLibraryInput!) {
    createUserLibrary(userId: $userId, input: $input) {
      _id
      name
    }
  }
`;

export const UPDATE_LIBRARY_NAME = gql`
  mutation updateLibraryName($id: ID!, $name: String!) {
    updateLibraryName(id: $id, name: $name) {
      _id
      name
      owner {
        _id
        username
        email
      }
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
  mutation Mutation($deleteLibraryId: ID!) {
    deleteLibrary(id: $deleteLibraryId) {
      _id
    }
  }
`;

export const ADD_SONG_TO_LIBRARY = gql`
  mutation addSongToLibrary(
    $libraryId: ID!
    $trackName: String!
    $artistName: String!
    $songPhoto: String!
    $lyrics: String!
  ) {
    addSongToLibrary(
      libraryId: $libraryId
      input: {
        trackName: $trackName
        artistName: $artistName
        songPhoto: $songPhoto
        lyrics: $lyrics
      }
    ) {
      _id
      name
      owner {
        _id
        username
        email
      }
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

export const REMOVE_SONG_FROM_LIBRARY = gql`
  mutation Mutation($libraryId: ID!, $songId: ID!) {
    removeSongFromLibrary(libraryId: $libraryId, songId: $songId) {
      _id
    }
  }
`;

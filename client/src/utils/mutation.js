import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        libraries {
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
    }
  }
`;

export const CREATE_LIBRARY = gql`
  mutation CreateLibrary($input: CreateLibraryInput!) {
    createLibrary(input: $input) {
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

export const ADD_LIBRARY_TO_USER = gql`
  mutation addLibraryToUser($name: String!) {
    addLibraryToUser(input: { name: $name }) {
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
  mutation deleteLibrary($id: ID!) {
    deleteLibrary(id: $id) {
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
  mutation removeSongFromLibrary($libraryId: ID!, $songId: ID!) {
    removeSongFromLibrary(libraryId: $libraryId, songId: $songId) {
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

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`;

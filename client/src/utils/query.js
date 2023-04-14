import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
      libraries {
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
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      username
      email
      libraries {
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
  }
`;

export const GET_LIBRARY_BY_ID = gql`
  query GetLibraryById($id: ID!) {
    getLibraryById(id: $id) {
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

export const GET_ALL_LIBRARIES = gql`
  query GetAllLibraries {
    getAllLibraries {
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

export const GET_SONG_BY_ID = gql`
  query GetSongById($id: ID!) {
    getSongById(id: $id) {
      _id
      trackName
      artistName
      songPhoto
      lyrics
    }
  }
`;

export const GET_ALL_SONGS = gql`
  query GetAllSongs {
    getAllSongs {
      _id
      trackName
      artistName
      songPhoto
      lyrics
    }
  }
`;

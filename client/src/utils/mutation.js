import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUser!) {
    createUser(input: $input) {
      _id
      username
      email
      password
      library {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      username
      email
      password
      library {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      username
      email
      password
      library {
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

export const UPDATE_LIBRARY = gql`
  mutation UpdateLibrary($id: ID!, $input: CreateLibraryInput!) {
    updateLibrary(id: $id, input: $input) {
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
  mutation DeleteLibrary($id: ID!) {
    deleteLibrary(id: $id) {
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

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      _id
      trackName
      artistName
      songPhoto
      lyrics
    }
  }
`;

export const UPDATE_SONG = gql`
  mutation UpdateSong($id: ID!, $input: CreateSongInput!) {
    updateSong(id: $id, input: $input) {
      _id
      trackName
      artistName
      songPhoto
      lyrics
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      _id
      trackName
      artistName
      songPhoto
      lyrics
    }
  }
`;

export const ADD_SONG_TO_LIBRARY = gql`
  mutation AddSongToLibrary($libraryId: ID!, $songId: ID!) {
    addSongToLibrary(libraryId: $libraryId, songId: $songId) {
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

export const REMOVE_SONG_FROM_LIBRARY = gql`
  mutation RemoveSongFromLibrary($libraryId: ID!, $songId: ID!) {
    removeSongFromLibrary(libraryId: $libraryId, songId: $songId) {
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

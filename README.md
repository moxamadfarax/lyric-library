# LyricLibrary [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- Description
- Usage
- Credits
- License
- Badges

## Decription

This app is a song lyric finder app. You can input a songs name and the name of the artist and get back some information about the song including the lyrics. we use the [genius-lyrics-api](https://docs.genius.com/) to fetch song data from. This app is built using the MERN stack. The front end is styled with [material ui](https://mui.com/). You are able to save songs that you search into a library of your choosing if you are logged in. If you are not logged in, you are still able to search songs on the home page.

This app uses [graphql](https://www.npmjs.com/package/graphql) and [apollo](https://www.npmjs.com/package/apollo) server along with [mongoose](https://www.npmjs.com/package/mongoose) to query and mutate data in the backend. This app utilizes an array of technologies on the backend like [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing nad protection, [express](https://www.npmjs.com/package/express) for server hosting, and [dotenv](https://www.npmjs.com/package/dotenv) to protect api keys and sensitive information. This application uses [json web tokens](https://www.npmjs.com/package/jsonwebtoken) to send and store sensitive information about the user, namely whether or not they are logged in.

## Usage!

[Here](https://lyric-library.herokuapp.com/) is the link to the deployed application on heroku.

Below are some pictures of the application in use.

![Page 1](client/assets//Screenshot%202023-04-18%20182808.png)
![Page 2](client/assets//Screenshot%202023-04-18%20182936.png)

## Credits

Work done by [Christopher Benjamin](https://github.com/chrisbchickin), and [Mohamed Farah](https://github.com/moxamadfarax).

## License

MIT License

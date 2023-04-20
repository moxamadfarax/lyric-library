const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { getLyrics } = require("genius-lyrics-api");
const fetch = require("node-fetch");
require("dotenv").config();

const apiKey = process.env.API_KEY;

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// app.get("/lyrics", (req, res) => {
//   const { artist, title } = req.query;
//   const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
//     title + " " + artist
//   )}&per_page=1`;

//   fetch(searchUrl, {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const hit = data.response.hits[0];

//       const trackId = hit.result.id;
//       const title = hit.result.title;
//       const artist = hit.result.primary_artist.name;
//       const releaseDate = hit.result.release_date_for_display;

//       getLyrics({
//         apiKey: apiKey,
//         title: title,
//         artist: artist,
//         optimizeQuery: false,
//         id: trackId,
//       }).then((lyrics) => {
//         res.send({
//           lyrics: lyrics,
//           artistName: artist,
//           songTitle: title,
//           thumbnail: hit.result.song_art_image_url,
//           title: title,
//           artist: artist,
//           releaseDate: releaseDate,
//         });
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error fetching lyrics");
//     });
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);

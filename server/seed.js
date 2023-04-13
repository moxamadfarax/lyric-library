const db = require("./config/connection");
const Users = require("./models/Users");
const Library = require("./models/Library");
const Songs = require("./models/Songs");

db.once("open", async () => {
  try {
    // Delete existing data
    await Users.deleteMany();
    await Library.deleteMany();
    await Songs.deleteMany();

    // Create new data
    const user1 = await Users.create({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    const user2 = await Users.create({
      username: "janedoe",
      email: "janedoe@example.com",
      password: "password456",
    });

    const song1 = await Songs.create({
      trackName: "Bohemian Rhapsody",
      artistName: "Queen",
      songPhoto: "https://example.com/bohemian-rhapsody.jpg",
      lyrics: "Is this the real life? Is this just fantasy?",
    });

    const song2 = await Songs.create({
      trackName: "Stairway to Heaven",
      artistName: "Led Zeppelin",
      songPhoto: "https://example.com/stairway-to-heaven.jpg",
      lyrics: "There's a lady who's sure all that glitters is gold",
    });

    const library1 = await Library.create({
      name: "Favorites",
      songs: [song1._id, song2._id],
    });

    const library2 = await Library.create({
      name: "Classics",
      songs: [song1._id, song2._id],
    });

    // Associate libraries with users
    user1.libraries = [library1._id];
    user2.libraries = [library1._id, library2._id];

    await user1.save();
    await user2.save();

    console.log("Seed data added successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

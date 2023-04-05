const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5500;

let createNoteData = [];


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));


app.get("/api/notes", function (error, res) {
  try {
    createNoteData = fs.readFileSync("db/db.json");
    console.log("Welcome to the Server!");
    createNoteData = JSON.parse(createNoteData);
  } catch (error) {
    console.log(error);
  }
  res.json(createNoteData);
});


app.post("/api/notes", function (req, res) {
  try {
    createNoteData = fs.readFileSync("./db/db.json", "utf8");
    console.log(createNoteData);
    createNoteData = JSON.parse(createNoteData);
    req.body.id = createNoteData.length;
    createNoteData.push(req.body);
    createNoteData = JSON.stringify(createNoteData);
    fs.writeFile("./db/db.json", createNoteData, "utf8", function (error) {
      if (error) throw error;
    });
    res.json(JSON.parse(createNoteData));
  } catch (error) {
    throw error;
    console.error(error);
  }
});


app.delete("/api/notes/:id", function (req, res) {
  try {
    createNoteData = fs.readFileSync("./db/db.json", "utf8");
    createNoteData = JSON.parse(createNoteData);
    createNoteData = createNoteData.filter(function (note) {
      return note.id != req.params.id;
    });
    createNoteData = JSON.stringify(createNoteData);

    fs.writeFile("./db/db.json", createNoteData, "utf8", function (error) {
      if (error) throw error;
    });

    res.send(JSON.parse(createNoteData));
  } catch (error) {
    throw error;
    console.log(error);
  }
});


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server is currently on port ${PORT}!`);
});
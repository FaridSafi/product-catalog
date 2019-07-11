const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Se connecter à la base de données
mongoose.connect("mongodb://localhost:27017/product-catalog", {
  useNewUrlParser: true
});

// Créer les models
const Department = mongoose.model("Department", {
  title: String
});

// Créer le serveur
const app = express();

// Activer body-parser
app.use(bodyParser.json());

// Créer les routes
app.post("/department/create", (req, res) => {
  return res.json("Hello World");
});

app.get("/department", (req, res) => {
  return res.json("Hello World");
});

app.post("/department/update", (req, res) => {
  return res.json("Hello World");
});

app.post("/department/delete", (req, res) => {
  return res.json("Hello World");
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Server started");
});

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
app.post("/department/create", async (req, res) => {
  try {
    const department = new Department({
      title: req.body.title
    });

    await department.save();

    return res.json({
      title: department.title,
      _id: department._id
    });
  } catch (error) {
    return res.status(400).json({ message: "An error occurred" });
  }
});

app.get("/department", async (req, res) => {
  try {
    const departments = await Department.find();
    return res.json(departments);
  } catch (error) {
    return res.status(400).json({ message: "An error occurred" });
  }
});

app.post("/department/update", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.body.title;

    const department = await Department.findById(id);

    // Vérifier que l'objet a bien été trouvé
    // if (department !== null && department !== undefined && department !== false && department !== 0 && department !== "" ) {
    if (department) {
      // Modifier l'objet
      department.title = title;

      // Enregistrer les modifications
      await department.save();

      return res.json(department);
    } else {
      return res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "An error occurred" });
  }
});

app.post("/department/delete", async (req, res) => {
  try {
    const id = req.query.id;

    const department = await Department.findById(id);

    // Vérifier que l'objet a bien été trouvé
    // if (department !== null && department !== undefined && department !== false && department !== 0 && department !== "" ) {
    if (department) {
      // Supprimer l'objet
      await department.remove();

      return res.json({
        message: "Department deleted"
      });
    } else {
      return res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "An error occurred" });
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Server started");
});

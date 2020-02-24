const express = require("express");
const router = express.Router();

//const sequelize = require("sequelize");

const { auth } = require("../middlewares/auth");

const { login, register } = require("../controllers/auth");

const species = require("../controllers/species");
const pet = require("../controllers/pet");


router.get("/", (req, res) => res.send("homee"));
router.post("/login", login);
router.post("/register", register);

router.post("/species", species.store);
router.get("/species", species.show);

router.get("/pets", pet.shows);
router.post("/pet", auth, pet.store);
router.put("/pet/:id", auth, pet.update);
router.delete("/pet/:id", auth, pet.destroy);

module.exports = router;

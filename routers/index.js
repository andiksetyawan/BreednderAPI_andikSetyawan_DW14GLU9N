const express = require("express");
const router = express.Router();

const sequelize = require("sequelize");

const { auth } = require("../middlewares/auth");

const { login, register, register111, genpasshash } = require("../controllers/auth");
const species = require("../controllers/species");
const pet = require("../controllers/pet");

router.get("/", (req, res) => res.send("homee"));
router.post("/login", login);
router.post("/register", register);

router.post("/species", species.store);
router.get("/species", species.show);

//router.get("/pets", auth, pet.show);
// router.post("/pet", store);
// router.put("/pet", show);
// router.delete("/pet", show);

////
// router.get("/gethash", genpasshash);
// router.post("/register1", register111);


module.exports = router;

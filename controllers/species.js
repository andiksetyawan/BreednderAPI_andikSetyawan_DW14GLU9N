const models = require("../models");
const Species = models.species;

exports.store = async (req, res) => {
  try {
    const species = await Species.create(req.body);
    if (species) {
      res.json({
        success: true,
        message: "Add species success",
        data: species
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Add species fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Add species fail",
      data: {}
    });
  }
};

exports.show = async (req, res) => {
    try {
      const species = await Species.findAll();
      if (species) {
        res.status(401).json({
          success: true,
          message: "Load species success",
          data: species
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Add species fail",
          data: {}
        });
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({
        success: false,
        message: "Add species fail",
        data: {}
      });
    }
  };


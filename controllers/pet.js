const models = require("../models");
const Pet = models.pet;

exports.store = async (req, res) => {
  try {
    // const data_pet = {

    // }

    const pet = await Pet.create(req.body);
    if (pet) {
      res.status(401).json({
        success: true,
        message: "Add pet success",
        data: pet
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Add pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Add pet fail",
      data: {}
    });
  }
};

exports.show = async (req, res) => {
  try {
    const pet = await Pet.findAll();
    if (pet) {
      res.status(401).json({
        success: true,
        message: "Load Pet success",
        data: pet
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Load pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "load pet fail",
      data: {}
    });
  }
};

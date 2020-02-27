const models = require("../models");
const Pet = models.pet;
const Species = models.species;
const Payment = models.payment;
const User = models.user;

exports.store = async (req, res) => {
  try {
    console.log("masuk store");
    const pet = req.body;
    const data_pet = {
      name: pet.name,
      gender: pet.gender.toLowerCase(),
      species_id: pet.spesies.id,
      age: pet.age.toLowerCase(),
      user_id: pet.user.id,
      about_pet: pet.about_pet,
      photo: pet.photo
    };
    console.log(data_pet);

    const check_payment = await Payment.findOne({
      where: { user_id: pet.user.id }
    });
    //console.log("cek ==== ", pet.user.id);
    if (check_payment) {
      if (check_payment.status === "premium") {
        const petq = await Pet.create(data_pet);

        if (petq) {
          const pet_return = await Pet.findOne({
            where: { id: petq.id },
            attributes: { exclude: ["species_id", "user_id"] },
            include: [
              {
                model: Species,
                // as: "spesies"
                attributes: ["id", "name"]
              },
              {
                model: User,
                // as: "user"
                attributes: ["id", "name", "address", "phone"]
              }
            ]
          });

          console.log("pet_return", pet_return);

          res.json({
            success: true,
            message: "Add pet success",
            data: pet_return
          });
        } else {
          res.json({
            success: false,
            message: "New Pet was successfully created",
            data: {}
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "You're not a Premium user",
          data: {}
        });
      }
    } else {
      res.json({
        success: false,
        message: "Add pet fail, not found payment data",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Add pet data failed, something went wrong",
      data: {}
    });
  }
};

exports.shows = async (req, res) => {
  try {
    const pet = await Pet.findAll({
      attributes: { exclude: ["species_id", "user_id"] },
      include: [
        {
          model: Species,
          // as: "spesies"
          attributes: ["id", "name"]
        },
        {
          model: User,
          // as: "user"
          attributes: ["id", "name", "address", "phone"]
        }
      ]
    });
    if (pet) {
      res.json({
        success: true,
        message: "Load Pet success",
        data: pet
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Load pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Loads pet data failed, something went wrong",
      data: {}
    });
  }
};

exports.update = async (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  try {
    const check_user = await Pet.findOne({ where: { id }, include: [User] });

    // console.log("check_user", check_user);
    // console.log("user", check_user.user.id + " === " + req.user);

    if (check_user) {
      if (check_user.user.id === req.user) {
        const petq = await Pet.update(req.body, {
          where: { id }
        });

        console.log("petq", petq);
        if (petq.length > 0 && petq[0]) {
          const pet = await Pet.findOne({
            attributes: { exclude: ["species_id", "user_id"] },
            where: { id },
            include: [
              {
                model: Species,
                // as: "spesies"
                attributes: ["id", "name"]
              },
              {
                model: User,
                // as: "user"
                attributes: ["id", "name", "address", "phone"]
              }
            ]
          });

          res.json({
            success: true,
            message: "Pet was successfully updated",
            data: pet
          });
        } else {
          res.status(401).json({
            success: false,
            message: "update pet fail",
            data: {}
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Not authorized",
          data: {}
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "update pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Updating pet data failed, something went wrong",
      data: {}
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.destroy({ where: { id } });
    if (pet) {
      res.json({
        success: true,
        message: "Pet was successfully deleted",
        data: { id }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "delete pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Deleting pet data failed, something went wrong",
      data: {}
    });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findOne({
      attributes: { exclude: ["species_id", "user_id"] },
      where: { id },
      include: [
        {
          model: Species,
          // as: "spesies"
          attributes: ["id", "name"]
        },
        {
          model: User,
          // as: "user"
          attributes: ["id", "name", "address", "phone"]
        }
      ]
    });
    if (pet) {
      res.json({
        success: true,
        message: "Pet was successfully loaded",
        data: pet
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Load pet fail",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load pet data failed, something went wrong",
      data: {}
    });
  }
};

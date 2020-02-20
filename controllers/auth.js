require("dotenv").config();

const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Pet = models.pet;

const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if(match){
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res.json({
          success: true,
          message: "Login berhasil",
          data: { email, token }
        });
      }else{
        res.status(401).json({
          success: false,
          message: "Invalid login, password wrong",
          data: {}
        });
      }
    }else{
      res.status(401).json({
        success: false,
        message: "Invalid login, email wrong",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Invalid Login",
      data: {}
    });
  }
};

exports.register = async(req, res) => {
  //const  user = req.body;
  const { pet } = req.body;
  models.sequelize
    .transaction(async t => {
      try {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const user = await User.create(req.body, { transaction: t });
        console.log("userr", user);
        const data_pet = {
          user_id: user.id,
          name: pet.name,
          gender: pet.gender,
          species_id: pet.spesies.id,
          age: pet.age.name
        };
       // console.log("datapet", data_pet);

        const petq = await Pet.create(data_pet, { transaction: t });
        //console.log("pet", user);

        return { user, pet: petq };
      } catch (error) {
        throw new Error();
      }
    })
    .then(data => {
      // Transaction has been committed
    //  console.log("data", data);
      const token = jwt.sign({ user_id: data.user.id }, process.env.SECRET_KEY);
      res.json({
        success: true,
        message: "Register success",
        data: { email: data.user.email, token }
      });
    })
    .catch(err => {
      console.log("err", err);
      // Transaction has been rolled back
      res.json({
        success: false,
        message: "Register fail",
        data: { sdfs: "sd" }
      });
    });
};

exports.register111 = async (req, res) => {
  try {
    const { pet } = req.body;

    const user = await User.create(req.body);
    if (user) {
      const data_pet = {
        user_id: user.dataValues.id,
        name: pet.name,
        gender: pet.gender,
        species_id: pet.spesies.id,
        age_id: pet.age.id
      };

      const pets = await Pet.create(data_pet);
      if (pet) {
        console.log(pets);
        const token = jwt.sign(
          { user_id: user.dataValues.id },
          process.env.SECRET_KEY
        );
        res.json({
          success: true,
          message: "Register success",
          data: { email: user.dataValues.email, token }
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Register failed",
          data: {}
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Register failed",
        data: {}
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Register failed",
      data: {}
    });
  }
};

exports.genpasshash = async (req, res) => {
  console.log("sdfs");
  const saltRounds = 10;
  const myPlaintextPassword = "1234";
  console.log(saltRounds);

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    res.send(hash);
  });
};

const models = require("../models");
const Payment = models.payment;
const User = models.user;

exports.store = async (req, res) => {
  try {
    const payment_data = {
      no_rek: req.body.no_rek,
      proof_of_transfer: req.body.proof_of_transfer,
      status: req.body.status,
      user_id: req.user
    };
    if (req.level === "admin") {
      res.json({
        success: true,
        message: "You're admin, can't add payment.",
        data: {}
      });
    } else {
      const payment = await Payment.create(payment_data);
      if (payment) {
        const payment_return = await Payment.findOne({
          where: { id: payment.id },
          attributes: { exclude: ["user_id"] },
          include: [
            {
              model: User,
              attributes: { exclude: ["password", "level"] }
            }
          ]
        });
        if (payment_return) {
          res.json({
            success: true,
            message: "Add payment success",
            data: payment_return
          });
        } else {
          res.json({
            success: true,
            message: "Something error, please check payments data.",
            data: {}
          });
        }

        // res.send(payment_return);
      } else {
        res.json({
          success: true,
          message: "Add payment fail",
          data: {}
        });
      }
    }
  } catch (err) {
    console.log("err", err);
    res.json({
      success: true,
      message: "Add payment fail , something error.",
      data: {}
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const payment_data = {
      no_rek: req.body.no_rek,
      proof_of_transfer: req.body.proof_of_transfer,
      status: req.body.status,
      user_id: req.body.user
    };

    // const check_admin = await User.findOne({
    //   where: { id: req.user } //get id from token auth admin
    // });
    //console.log(check_admin);
    // console.log(req.user +"==="+ check_admin.user.id)
    console.log("level", req.level);
    if (req.level === "admin") {
      const payment = await Payment.update(payment_data, { where: { id } });
      if (payment.length > 0 && payment[0]) {
        const payment_return = await Payment.findOne({
          where: { id },
          attributes: { exclude: ["user_id"] },
          include: [{ model: User, attributes: { exclude: ["password"] } }]
        });
        res.json({
          success: true,
          message: "Update payment success",
          data: payment_return
        });
      } else {
        res.json({
          success: false,
          message: "Update payment fail",
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
  } catch (err) {
    console.log("err", err);
    res.json({
      success: false,
      message: "Update payment fail",
      data: {}
    });
  }
};

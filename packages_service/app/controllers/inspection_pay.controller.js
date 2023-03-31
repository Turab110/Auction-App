const Inspection_pay = require("../models/inspection_pay.model").inspection_payment;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createInspPay": {
      return [
        body("buyer_id", "buyer_id is required").notEmpty(),
        body("inspection_id", "inspection_id is required").notEmpty(),
        body("payment_amount", "payment_amount is required").notEmpty(),
      ];
    }
    case "updateInspPay": {
      return [
        body("buyer_id", "buyer_id is required").notEmpty(),
        body("inspection_id", "inspection_id is required").notEmpty(),
        body("payment_amount", "payment_amount is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  var error =[];
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } 
  else {
  const inspection_pay = {
    buyer_id: req.body.buyer_id,
    inspection_id: req.body.inspection_id,
    payment_amount: req.body.payment_amount,
    status: 1,
  };

  Inspection_pay.findOne({ buyer_id: req.body.buyer_id,inspection_id: req.body.inspection_id })
    .then((data) => {
      if (!data) {
        Inspection_pay.create(inspection_pay)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Inspection_pay",
            });
          });
      } else {
        res.status(400).send({
          message: "Data Already Exist",
        });
      }
    })
    .catch((err) => {
      res.status(502).send({
        message: err.message || "Some error occured while retrieving Inspection_pay",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Inspection_pay.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Inspection_pay",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Inspection_pay.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Inspection_pay",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Inspection_pay.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Inspection_pay with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req); // Finds the validation errors
  var error =[];
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } 
  else {
       
        var query = { _id: new Mongoose.Types.ObjectId(id)};
        Inspection_pay.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Inspection_pay was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Inspection_pay with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Inspection_pay.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Inspection_pay was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Inspection_pay with id=${id}`,
        });
      }
    });
  };
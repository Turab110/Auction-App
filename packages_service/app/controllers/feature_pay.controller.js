const Feature_pay = require("../models/feature_pay.model").feature_payment;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createFeatPay": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("auction_id", "auction_id is required").notEmpty(),
        body("assign_feature_id", "assign_feature_id is required").notEmpty(),
        body("payment_amount", "payment_amount is required").notEmpty(),
      ];
    }
    case "updateFeatPay": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("auction_id", "auction_id is required").notEmpty(),
        body("assign_feature_id", "assign_feature_id is required").notEmpty(),
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
  const feature_pay = {
    seller_id: req.body.seller_id,
    auction_id: req.body.auction_id,
    assign_feature_id: req.body.assign_feature_id,
    payment_amount: req.body.payment_amount,
    status: 1,
  };

  Feature_pay.findOne({ 
    seller_id: req.body.seller_id,
    auction_id: req.body.auction_id,
    assign_feature_id: req.body.assign_feature_id })
    .then((data) => {
      if (!data) {
        Feature_pay.create(feature_pay)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Feature_pay",
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
        message: err.message || "Some error occured while retrieving Feature_pay",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Feature_pay.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Feature_pay",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Feature_pay.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Feature_pay",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Feature_pay.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Feature_pay with id=" + id,
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
        Feature_pay.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Feature_pay was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Feature_pay with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Feature_pay.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Feature_pay was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Feature_pay with id=${id}`,
        });
      }
    });
  };
const Feature_pack = require("../models/feature_pack.model").feature_package;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createFeatPack": {
      return [
        body("feature_name", "feature_name is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("days_limit", "days_limit is required").notEmpty(),
      ];
    }
    case "updateFeatPack": {
      return [
        body("feature_name", "feature_name is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("days_limit", "days_limit is required").notEmpty(),
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
  const feature_pack = {
    feature_name: req.body.feature_name,
    price: req.body.price,
    days_limit: req.body.days_limit,
    status: 1,
  };

  Feature_pack.findOne({ feature_name: req.body.feature_name })
    .then((data) => {
      if (!data) {
        Feature_pack.create(feature_pack)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Feature_pack",
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
        message: err.message || "Some error occured while retrieving Feature_pack",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Feature_pack.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Feature_pack",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Feature_pack.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Feature_pack",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Feature_pack.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Feature_pack with id=" + id,
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
        Feature_pack.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Feature_pack was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Feature_pack with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Feature_pack.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Feature_pack was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Feature_pack with id=${id}`,
        });
      }
    });
  };
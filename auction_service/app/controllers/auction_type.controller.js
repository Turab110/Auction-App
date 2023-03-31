const Auction_type = require("../models/auction_type.model").auction_type;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucType": {
      return [
        body("auction_type_name", "Auction Type name is required").notEmpty(),
      ];
    }
    case "updateAucType": {
      return [
        body("auction_type_name", "Auction Type name is required").notEmpty(),
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
      const auction_type = {
        auction_type_name: req.body.auction_type_name,
        status: 1,
      };

      Auction_type.findOne({ auction_type_name: req.body.auction_type_name })
        .then((data) => {
          if (!data) {
            Auction_type.create(auction_type)
              .then((data) => {
                res.status(200).send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the auction_type",
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
            message: err.message || "Some error occured while retrieving auction_type",
          });
        });
    }
};

exports.findAll = (req, res) => {
    Auction_type.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving auction_type",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Auction_type.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving auction_type",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_type.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving auction_type with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  var error =[];
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } 
  else {
        const id = req.params.id;
        var query = { _id: new Mongoose.Types.ObjectId(id)};
        Auction_type.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "auction_type was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update auction_type with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_type.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "auction_type was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete auction_type with id=${id}`,
        });
      }
    });
  };
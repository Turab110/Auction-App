const Auction_result = require("../models/auction_result.model").auction_result;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucResult": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "buyer id is required").notEmpty(),
        body("bid_id", "bid id is required").notEmpty(),
        body("bid_amount", "Bid Amount is required").notEmpty()
      ];
    }
    case "updateAucResult": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "buyer id is required").notEmpty(),
        body("bid_id", "bid id is required").notEmpty(),
        body("bid_amount", "Bid Amount is required").notEmpty(),
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
      const auction_result = {
        auction_id: req.body.auction_id,
        buyer_id: req.body.buyer_id,
        bid_amount: req.body.bid_amount,
        bid_id: req.body.bid_id,
        status: 1,
      };

      Auction_result.findOne({ 
        auction_id: req.body.auction_id
         })
        .then((data) => {
          if (!data) {
            Auction_result.create(auction_result)
              .then((data) => {
                res.status(200).send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the Auction_result",
                });
              });
          } else {
            res.status(400).send({
              message: "bid already exist on this auction with same amount your entered ",
            });
          }
        })
        .catch((err) => {
          res.status(502).send({
            message: err.message || "Some error occured while retrieving Auction_result",
          });
        });
    }
};

exports.findAll = (req, res) => {
    Auction_result.find() //findAll return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_result",
          });
        } else {
          res.status(200).send(data);
        }
      });
};

exports.findActive = (req, res) => {
    Auction_result.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_result",
          });
        } else {
          res.status(200).send(data);
        }
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_result.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Auction_result with id=" + id,
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
        Auction_result.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Auction_result was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Auction_result with id=${id}`,
            });
          }
        });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_result.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Auction_result was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Auction_result with id=${id}`,
        });
      }
    });
};
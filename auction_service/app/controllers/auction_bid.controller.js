const Auction_bid = require("../models/auction_bid.model").auction_bid;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucBid": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "user id is required").notEmpty(),
        body("bid_amount", "Bid Amount is required").notEmpty()
      ];
    }
    case "updateAucBid": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "user id is required").notEmpty(),
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
      const auction_bid = {
        auction_id: req.body.auction_id,
        buyer_id: req.body.buyer_id,
        bid_amount: req.body.bid_amount,
        datetime: req.body.datetime,
        status: 1,
      };

        Auction_bid.findOne({ 
        auction_id: req.body.auction_id,
        buyer_id: req.body.buyer_id,
        bid_amount: req.body.bid_amount
         })
        .then((data) => {
          if (!data) {
            Auction_bid.create(auction_bid)
              .then((data) => {
                res.status(200).send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the Auction_bid",
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
            message: err.message || "Some error occured while retrieving Auction_bid",
          });
        });
    }
};

exports.findAll = (req, res) => {
    Auction_bid.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Auction_bid",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Auction_bid.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_bid",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_bid.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Auction_bid with id=" + id,
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
        Auction_bid.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Auction_bid was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Auction_bid with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_bid.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Auction_bid was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Auction_bid with id=${id}`,
        });
      }
    });
  };
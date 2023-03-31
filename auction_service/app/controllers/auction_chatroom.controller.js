const Auction_chatroom = require("../models/auction_chatroom.model").auction_chatroom;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucChatroom": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("seller_id", "Seller id is required").notEmpty(),
        body("buyer_id", "Buyer id is required").notEmpty(),
      ];
    }
    case "updateAucChatroom": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("seller_id", "Seller id is required").notEmpty(),
        body("buyer_id", "Buyer id is required").notEmpty(),
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
      const auction_chatroom = {
        auction_id: req.body.auction_id,
        seller_id: req.body.seller_id,
        buyer_id: req.body.buyer_id,
        date: req.body.datetime,
        status: 1,
      };

        Auction_chatroom.findOne({ 
        auction_id: req.body.auction_id,
        user_id: req.body.user_id,
        buyer_id: req.body.buyer_id,
         })
        .then((data) => {
          if (!data) {
            Auction_chatroom.create(auction_chatroom)
              .then((data) => {
                res.status(200).send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the Auction_chatroom",
                });
              });
          } else {
            res.status(200).send(data);
          }
        })
        .catch((err) => {
          res.status(502).send({
            message: err.message || "Some error occured while retrieving Auction_chatroom",
          });
        });
    }
};

exports.findAll = (req, res) => {
    Auction_chatroom.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Auction_chatroom",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Auction_chatroom.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_chatroom",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_chatroom.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Auction_chatroom with id=" + id,
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
        Auction_chatroom.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Auction_chatroom was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Auction_chatroom with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_chatroom.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Auction_chatroom was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Auction_chatroom with id=${id}`,
        });
      }
    });
  };
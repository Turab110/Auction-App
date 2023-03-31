const Auction_report = require("../models/auction_report.model").auction_report;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucReport": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "user id is required").notEmpty(),
        body("complain", "complain is required").notEmpty()
      ];
    }
    case "updateAucReport": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
        body("buyer_id", "user id is required").notEmpty(),
        body("complain", "complain is required").notEmpty(),
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
      const auction_report = {
        auction_id: req.body.auction_id,
        buyer_id: req.body.buyer_id,
        complain: req.body.complain,
        status: 1,
      };

        Auction_report.findOne({ 
        auction_id: req.body.auction_id,
        buyer_id: req.body.buyer_id,
         })
        .then((data) => {
          if (!data) {
            Auction_report.create(auction_report)
              .then((data) => {
                res.status(200).send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the Auction_report",
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
            message: err.message || "Some error occured while retrieving Auction_report",
          });
        });
    }
};

exports.findAll = (req, res) => {
    Auction_report.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Auction_report",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Auction_report.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_report",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_report.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Auction_report with id=" + id,
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
        Auction_report.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Auction_report was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Auction_report with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_report.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Auction_report was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Auction_report with id=${id}`,
        });
      }
    });
  };
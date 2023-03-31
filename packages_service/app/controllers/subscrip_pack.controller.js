const Subscrip_pack = require("../models/subscrip_pack.model").subscription_package;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSubsPack": {
      return [
        body("subs_pack_name", "subs_pack_name is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("auctions_limit", "auctions_limit is required").notEmpty(),
        body("duration", "duration is required").notEmpty(),
      ];
    }
    case "updateSubsPack": {
      return [
        body("subs_pack_name", "subs_pack_name is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("auctions_limit", "auctions_limit is required").notEmpty(),
        body("duration", "duration is required").notEmpty(),
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
  const subscrip_pack = {
    subs_pack_name: req.body.subs_pack_name,
    price: req.body.price,
    auctions_limit: req.body.auctions_limit,
    duration: req.body.duration,
    status: 1,
  };

  Subscrip_pack.findOne({ subs_pack_name: req.body.subs_pack_name })
    .then((data) => {
      if (!data) {
        Subscrip_pack.create(subscrip_pack)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Subscrip_pack",
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
        message: err.message || "Some error occured while retrieving Subscrip_pack",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Subscrip_pack.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Subscrip_pack",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Subscrip_pack.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Subscrip_pack",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Subscrip_pack.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Subscrip_pack with id=" + id,
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
        Subscrip_pack.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Subscrip_pack was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Subscrip_pack with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Subscrip_pack.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Subscrip_pack was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Subscrip_pack with id=${id}`,
        });
      }
    });
  };
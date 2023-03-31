const Assign_feature = require("../models/assign_feature.model").assign_feature;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAssFeat": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("auction_id", "auction_id is required").notEmpty(),
        body("feat_pack_id", "feat_pack_id is required").notEmpty(),
        body("start_date", "start_date is required").notEmpty(),
        body("end_date", "end_date is required").notEmpty(),
      ];
    }
    case "updateAssFeat": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("auction_id", "auction_id is required").notEmpty(),
        body("feat_pack_id", "feat_pack_id is required").notEmpty(),
        body("start_date", "start_date is required").notEmpty(),
        body("end_date", "end_date is required").notEmpty(),
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
  const assign_feature = {
    seller_id: req.body.seller_id,
    auction_id: req.body.auction_id,
    feat_pack_id: req.body.feat_pack_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    expire: 0,
    status: 1,
  };

  Assign_feature.findOne({ 
    seller_id: req.body.seller_id, 
    auction_id: req.body.auction_id,
    feat_pack_id: req.body.feat_pack_id,
    expire: 0 })
    .then((data) => {
      if (!data) {
        Assign_feature.create(assign_feature)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Assign_feature",
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
        message: err.message || "Some error occured while retrieving Assign_feature",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Assign_feature.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Assign_feature",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Assign_feature.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Assign_feature",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Assign_feature.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Assign_feature with id=" + id,
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
        Assign_feature.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Assign_feature was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Assign_feature with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Assign_feature.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Assign_feature was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Assign_feature with id=${id}`,
        });
      }
    });
  };
const Assign_subscrip = require("../models/assign_subscrip.model").assign_subscription;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAssSubs": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("subs_pack_id", "subs_pack_id is required").notEmpty(),
        body("start_date", "start_date is required").notEmpty(),
        body("end_date", "end_date is required").notEmpty(),
        body("no_of_auction", "no_of_auction is required").notEmpty(),
        body("is_expired", "is_expired is required").notEmpty(),
        body("is_completed", "is_completed is required").notEmpty(),
      ];
    }
    case "updateAssSubs": {
      return [
        body("seller_id", "seller_id is required").notEmpty(),
        body("subs_pack_id", "subs_pack_id is required").notEmpty(),
        body("start_date", "start_date is required").notEmpty(),
        body("end_date", "end_date is required").notEmpty(),
        body("no_of_auction", "no_of_auction is required").notEmpty(),
        body("is_expired", "is_expired is required").notEmpty(),
        body("is_completed", "is_completed is required").notEmpty(),
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
  const assign_subscrip = {
    seller_id: req.body.seller_id,
    subs_pack_id: req.body.subs_pack_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    no_of_auction: req.body.no_of_auction,
    is_expired: req.body.is_expired,
    is_completed: req.body.is_completed,
    expire: 0,
    status: 1,
  };

  Assign_subscrip.findOne({ 
    seller_id: req.body.seller_id, 
    subs_pack_id: req.body.subs_pack_id,
    is_expired: 0,
    is_completed:0 })
    .then((data) => {
      if (!data) {
        Assign_subscrip.create(assign_subscrip)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Assign_subscrip",
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
        message: err.message || "Some error occured while retrieving Assign_subscrip",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Assign_subscrip.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Assign_subscrip",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Assign_subscrip.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Assign_subscrip",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Assign_subscrip.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Assign_subscrip with id=" + id,
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
        Assign_subscrip.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Assign_subscrip was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Assign_subscrip with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Assign_subscrip.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Assign_subscrip was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Assign_subscrip with id=${id}`,
        });
      }
    });
  };
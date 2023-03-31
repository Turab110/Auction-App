const Submenu = require("../models/submenu.model").submenu;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSubmenu": {
      return [
        body("sub_title", "Sub title is required").notEmpty(),
        body("sub_link", "Sub link is required").notEmpty(),
        body("sub_seq", "Sub sequence is required").notEmpty(),
        body("sub_seq", "sub_seq value must be in integer").isInt(),
        body("main_id", "main_id is required").notEmpty(),
      ];
    }
    case "updateSubmenu": {
      return [
        body("sub_title", "Sub title is required").notEmpty(),
        body("sub_link", "Sub link is required").notEmpty(),
        body("sub_seq", "Sub sequence is required").notEmpty(),
        body("sub_seq", "sub_seq value must be in integer").isInt(),
        body("main_id", "main_id is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
  const submenu = {
    sub_title: req.body.sub_title,
    main_id: req.body.main_id,
    sub_link: req.body.sub_link,
    sub_seq: req.body.sub_seq,
    status: 1,
  };

  Submenu.findOne({ sub_title: req.body.sub_title })
    .then((data) => {
      if (!data) {
        Submenu.create(submenu)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Submenu",
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
        message: err.message || "Some error occured while retrieving Submenu",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Submenu.find().populate("main_id") //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Submenu",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Submenu.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Submenu",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Submenu.find({ _id: new Mongoose.Types.ObjectId(id)}).populate("main_id")  //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Submenu with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req); // Finds the validation errors

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    } else {
    var query = { _id: new Mongoose.Types.ObjectId(id)};
    Submenu.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "Submenu was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Submenu with id=${id}`,
        });
      }
    });
  }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Submenu.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Submenu was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Submenu with id=${id}`,
        });
      }
    });
  };
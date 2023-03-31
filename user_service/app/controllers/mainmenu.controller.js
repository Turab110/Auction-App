const Mainmenu = require("../models/mainmenu.model").mainmenu;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMainmenu": {
      return [
        body("main_title", "Main title is required").notEmpty(),
        body("main_link", "Main link is required").notEmpty(),
        body("main_seq", "Main sequence is required").notEmpty(), 
        body("main_seq", "main_seq value must be in integer").isInt(),
      ];
    }
    case "updateMainmenu": {
      return [
        body("main_title", "Main title is required").notEmpty(),
        body("main_link", "Main link is required").notEmpty(),
        body("main_seq", "Main sequence is required").notEmpty(),
        body("main_seq", "main_seq value must be in integer").isInt(),
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
  const mainmenu = {
    main_title: req.body.main_title,
    main_link: req.body.main_link,
    main_seq: req.body.main_seq,
    status: 1,
  };

  Mainmenu.findOne({ main_title: req.body.main_title })
    .then((data) => {
      if (!data) {
        Mainmenu.create(mainmenu)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the mainmenu",
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
        message: err.message || "Some error occured while retrieving mainmenu",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Mainmenu.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving mainmenu",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Mainmenu.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving mainmenu",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Mainmenu.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving mainmenu with id=" + id,
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
        Mainmenu.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "mainmenu was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update mainmenu with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Mainmenu.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "mainmenu was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete mainmenu with id=${id}`,
        });
      }
    });
  };
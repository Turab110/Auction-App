const Sub_Category = require("../models/sub_cat.model").sub_category;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSubCat": {
      return [
        body("sub_cat_name", "Sub category name is required").notEmpty(),
        body("main_cat_id", "main_cat_id is required").notEmpty(),
      ];
    }
    case "updateSubCat": {
      return [
        body("sub_cat_name", "Sub category name is required").notEmpty(),
        body("main_cat_id", "main_cat_id is required").notEmpty(),
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
  const category = {
    sub_cat_name: req.body.sub_cat_name,
    main_cat_id: req.body.main_cat_id,
    status: 1,
  };

  Sub_Category.findOne({ sub_cat_name: req.body.sub_cat_name })
    .then((data) => {
      if (!data) {
        Sub_Category.create(category)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Category",
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
        message: err.message || "Some error occured while retrieving Category",
      });
    });
  }
};

exports.findAll = (req, res) => {
    Sub_Category.find().populate("main_cat_id") //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Category",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Sub_Category.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Category",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Sub_Category.find({ _id: new Mongoose.Types.ObjectId(id)}).populate("main_cat_id")  //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Category with id=" + id,
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
    Sub_Category.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "Category was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Category with id=${id}`,
        });
      }
    });
  }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Sub_Category.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Category was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Category with id=${id}`,
        });
      }
    });
  };
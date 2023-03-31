const Main_Category = require("../models/main_cat.model").main_category;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMainCat": {
      return [
        body("main_cat_name", "Main category name is required").notEmpty(),
      ];
    }
    case "updateMainCat": {
      return [
        body("main_cat_name", "Main category name is required").notEmpty(),
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
    if (req.file == undefined) {
      res.status(400).send({
        message: "Category image can not be empty !",
      });
      return;
    }
    
      else{
      var image_path;
      
        if (req.file.mimetype != "image/jpeg" &&
            req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png"
        ) {
          error.push("image type must be jpg, png, jpeg!");
        } else {
          image_path = req.protocol + "://" + req.get("Host") + "/public/category_image/" + req.file.filename;

          const category = {
            main_cat_name: req.body.main_cat_name,
            main_cat_image: image_path,
            status: 1,
          };
    
          Main_Category.findOne({ main_cat_name: req.body.main_cat_name })
            .then((data) => {
              if (!data) {
                Main_Category.create(category)
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
      }
    
    }
};

exports.findAll = (req, res) => {
    Main_Category.find() //findAll return array
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
    Main_Category.find().where('status').equals(1) //findActive return array
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
    Main_Category.findById(id) //fineone or findByPK return object
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
  const errors = validationResult(req); // Finds the validation errors
  var error =[];
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } 
  else {
    if (req.file == undefined) {
        const id = req.params.id;
        var query = { _id: new Mongoose.Types.ObjectId(id)};
        Main_Category.findOneAndUpdate(query,req.body,{ upsert: true })
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
      else{
        var image_path;
      
        if (req.file.mimetype != "image/jpeg" &&
            req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png"
        ) {
          error.push("image type must be jpg, png, jpeg!");
        } else {
          image_path = req.protocol + "://" + req.get("Host") + "/public/category_image/" + req.file.filename;

          const category = {
            main_cat_name: req.body.main_cat_name,
            main_cat_image: image_path,
            status: 1,
          };
    
          var query = { _id: new Mongoose.Types.ObjectId(id)};
          Main_Category.findOneAndUpdate(query,category,{ upsert: true })
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
      }
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Main_Category.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
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
const Incpection = require("../models/incpection.model").incpection;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createIncpection": {
      return [
        body("auction_id", "auction_id is required").notEmpty(),
        body("product_reviews", "Reviews is required").notEmpty(),
        body("description", "Description is required").notEmpty(),
        body("rating", "rating is required").notEmpty(),
        body("rating", "rating value must be in integer").isInt(),
      ];
    }
    case "updateIncpection": {
      return [
        body("auction_id", "auction_id is required").notEmpty(),
        body("product_reviews", "Reviews is required").notEmpty(),
        body("description", "Description is required").notEmpty(),
        body("rating", "rating is required").notEmpty(),
        body("rating", "rating value must be in integer").isInt(),
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
              message: "Incpection report can not be empty !",
            });
            return;
          }
          
            else{
            var report_path;
            
              if (req.file.mimetype != "image/jpeg" &&
                  req.file.mimetype != "image/jpg" &&
                  req.file.mimetype != "image/png"
              ) {
                error.push("image type must be jpg, png, jpeg!");
              } else {
                report_path = req.protocol + "://" + req.get("Host") + "/public/Incpection_report/" + req.file.filename;
      
                const incpection = {
                    auction_id: req.body.auction_id,
                    product_reviews: req.body.product_reviews,
                    description: req.body.description,
                    rating: req.body.rating,
                    incpection_report: report_path,
                    status: 1,
                };
        
                Incpection.findOne({ auction_id: req.body.auction_id })
                    .then((data) => {
                    if (!data) {
                        Incpection.create(incpection)
                        .then((data) => {
                            res.status(200).send(data);
                        })
                        .catch((err) => {
                            res.status(500).send({
                            message:
                                err.message || "Some error occurred while create the Incpection",
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
                        message: err.message || "Some error occured while retrieving Incpection",
                    });
                    });
              }
            }
        }
};

exports.findAll = (req, res) => {
    Incpection.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Incpection",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Incpection.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Incpection",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Incpection.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Incpection with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    var error =[];
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    else
    {
              
        if (req.file == undefined) {
            var query = { _id: new Mongoose.Types.ObjectId(id)};
            Incpection.findOneAndUpdate(query,req.body,{ upsert: true })
              .then((data) => {
              if (data[0] != 0) {
                res.status(200).send({
                  message: "Incpection was updated successfully",
                });
              } else {
                res.status(500).send({
                  message: `Cannot update Incpection with id=${id}`,
                });
              }
            });
          }
          else{
        
                var report_path;
            
                  if (req.file.mimetype != "image/jpeg" &&
                      req.file.mimetype != "image/jpg" &&
                      req.file.mimetype != "image/png"
                  ) {
                    error.push("image type must be jpg, png, jpeg!");
                  } else {
                    report_path = req.protocol + "://" + req.get("Host") + "/public/Incpection_report/" + req.file.filename;
          
                    const Incpection = {
                        auction_id: req.body.auction_id,
                        product_reviews: req.body.product_reviews,
                        description: req.body.description,
                        rating: req.body.rating,
                        incpection_report: report_path,
                        status: req.body.status,
                    };
              
                var query = { _id: new Mongoose.Types.ObjectId(id)};
                Incpection.findOneAndUpdate(query,Incpection,{ upsert: true })
                  .then((data) => {
                  if (data[0] != 0) {
                    res.status(200).send({
                      message: "Incpection was updated successfully",
                    });
                  } else {
                    res.status(500).send({
                      message: `Cannot update Incpection with id=${id}`,
                    });
                  }
                });
              }
            } 
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Incpection.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Incpection was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Incpection with id=${id}`,
        });
      }
    });
  };
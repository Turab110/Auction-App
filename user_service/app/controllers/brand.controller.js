const Brand = require("../models/brand.model").brand;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createBrand": {
      return [
        body("brand_name", "Brand is required").notEmpty(),
        body("brand_description", "Description is required").notEmpty(),
      ];
    }
    case "updateBrand": {
      return [
        body("brand_name", "Brand is required").notEmpty(),
        body("brand_description", "Description is required").notEmpty(),
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
              message: "Material image can not be empty !",
            });
            return;
          }
          
            else{
            var logo_path;
            
              if (req.file.mimetype != "image/jpeg" &&
                  req.file.mimetype != "image/jpg" &&
                  req.file.mimetype != "image/png"
              ) {
                error.push("image type must be jpg, png, jpeg!");
              } else {
                logo_path = req.protocol + "://" + req.get("Host") + "/public/brand_logo/" + req.file.filename;
      
                const brand = {
                    brand_name: req.body.brand_name,
                    brand_description: req.body.brand_description,
                    logo: logo_path,
                    status: 1,
                };
        
                Brand.findOne({ brand_name: req.body.brand_name })
                    .then((data) => {
                    if (!data) {
                        Brand.create(brand)
                        .then((data) => {
                            res.status(200).send(data);
                        })
                        .catch((err) => {
                            res.status(500).send({
                            message:
                                err.message || "Some error occurred while create the Brand",
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
                        message: err.message || "Some error occured while retrieving Brand",
                    });
                    });
              }
            }
        }
};

exports.findAll = (req, res) => {
    Brand.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Brand",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Brand.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Brand",
          });
        } else {
          res.status(200).send(data);
        }
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Brand.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Brand with id=" + id,
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
          Brand.findOneAndUpdate(query,req.body,{ upsert: true })
            .then((data) => {
            if (data[0] != 0) {
              res.status(200).send({
                message: "Brand was updated successfully",
              });
            } else {
              res.status(500).send({
                message: `Cannot update Brand with id=${id}`,
              });
            }
          });
        }
        else{
      
              var logo_path;
          
                if (req.file.mimetype != "image/jpeg" &&
                    req.file.mimetype != "image/jpg" &&
                    req.file.mimetype != "image/png"
                ) {
                  error.push("image type must be jpg, png, jpeg!");
                } else {
                  logo_path = req.protocol + "://" + req.get("Host") + "/public/brand_logo/" + req.file.filename;
        
                  const brand = {
                      brand_name: req.body.brand_name,
                      brand_description: req.body.brand_description,
                      logo: logo_path,
                      status: req.body.status,
                  };
            
              var query = { _id: new Mongoose.Types.ObjectId(id)};
              Brand.findOneAndUpdate(query,brand,{ upsert: true })
                .then((data) => {
                if (data[0] != 0) {
                  res.status(200).send({
                    message: "Brand was updated successfully",
                  });
                } else {
                  res.status(500).send({
                    message: `Cannot update Brand with id=${id}`,
                  });
                }
              });
            }
          } 
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Brand.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
  .then((data) => {
    if (data) {
      res.status(200).send({
        message: "Brand was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete Brand with id=${id}`,
      });
    }
  });
};
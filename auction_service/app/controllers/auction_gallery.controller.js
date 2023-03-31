const Auction_gallery = require("../models/auction_gallery.model").auction_gallery;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createAucGallery": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
      ];
    }
    case "updateAucGallery": {
      return [
        body("auction_id", "Auction id is required").notEmpty(),
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
              message: "Product image can not be empty !",
            });
            return;
          }
          
            else{
            var product_path;
            
              if (req.file.mimetype != "image/jpeg" &&
                  req.file.mimetype != "image/jpg" &&
                  req.file.mimetype != "image/png"
              ) {
                error.push("image type must be jpg, png, jpeg!");
              } else {
                product_path = req.protocol + "://" + req.get("Host") + "/public/product_gallery/" + req.file.filename;
      
                const auction_gallery = {
                    auction_id: req.body.auction_id,
                    product_image: product_path,
                    status: 1,
                };
        
            
                Auction_gallery.create(auction_gallery)
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                    message:
                        err.message || "Some error occurred while create the Auction_gallery",
                    });
                });
                   
                   
              }
            }
        }
};

exports.findAll = (req, res) => {
    Auction_gallery.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Auction_gallery",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Auction_gallery.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Auction_gallery",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Auction_gallery.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Auction_gallery with id=" + id,
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
            res.status(400).send({
              message: "Product image can not be empty !",
            });
            return;
          }
          
            else{
            var product_path;
            
              if (req.file.mimetype != "image/jpeg" &&
                  req.file.mimetype != "image/jpg" &&
                  req.file.mimetype != "image/png"
              ) {
                error.push("image type must be jpg, png, jpeg!");
              } else {
                product_path = req.protocol + "://" + req.get("Host") + "/public/product_gallery/" + req.file.filename;
      
                const auction_gallery = {
                    auction_id: req.body.auction_id,
                    product_image: product_path,
                    status: req.body.status,
                };
        
            
                var query = { _id: new Mongoose.Types.ObjectId(id)};
                Auction_gallery.findOneAndUpdate(query,auction_gallery,{ upsert: true })
                    .then((data) => {
                    if (data[0] != 0) {
                    res.status(200).send({
                        message: "Auction_gallery was updated successfully",
                    });
                    } else {
                    res.status(500).send({
                        message: `Cannot update Auction_gallery with id=${id}`,
                    });
                    }
                });
                   
                   
              }
            }
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Auction_gallery.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Auction_gallery was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Auction_gallery with id=${id}`,
        });
      }
    });
  };
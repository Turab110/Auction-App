const User_auction = require("../models/user_auction.model").user_auction;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUserAuc": {
      return [
        body("product_name", "product_name is required").notEmpty(),
        body("product_detail", "product_detail is required").notEmpty(),
        body("product_descrip", "product_descrip is required").notEmpty(),
        body("product_feature", "product_feature is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("minimum_bid", "minimum_bid is required").notEmpty(),
        body("location", "location is required").notEmpty(),
        body("assign_feature_id", "assign_feature_id is required").notEmpty(),
        body("longitude", "longitude is required").notEmpty(),
        body("latitude", "latitude is required").notEmpty(),
        body("user_id", "user_id is required").notEmpty(),
        body("auction_type_id", "auction_type_id is required").notEmpty(),
        body("sub_cat_id", "sub_cat_id is required").notEmpty(),
        body("brand_id", "brand_id is required").notEmpty(),
      ];
    }
    case "updateUserAuc": {
      return [
        body("product_name", "product_name is required").notEmpty(),
        body("product_detail", "product_detail is required").notEmpty(),
        body("product_descrip", "product_descrip is required").notEmpty(),
        body("product_feature", "product_feature is required").notEmpty(),
        body("price", "price is required").notEmpty(),
        body("minimum_bid", "minimum_bid is required").notEmpty(),
        body("location", "location is required").notEmpty(),
        body("assign_feature_id", "assign_feature_id is required").notEmpty(),
        body("longitude", "longitude is required").notEmpty(),
        body("latitude", "latitude is required").notEmpty(),
        body("user_id", "user_id is required").notEmpty(),
        body("auction_type_id", "auction_type_id is required").notEmpty(),
        body("sub_cat_id", "sub_cat_id is required").notEmpty(),
        body("brand_id", "brand_id is required").notEmpty(),
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
      const user_auction = {
        product_name: req.body.product_name,
        product_detail: req.body.product_detail,
        product_descrip: req.body.product_descrip,
        product_feature: req.body.product_feature,
        price: req.body.price,
        minimum_bid: req.body.minimum_bid,
        location: req.body.location,
        assign_feature_id: req.body.assign_feature_id,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        user_id: req.body.user_id,
        auction_type_id: req.body.auction_type_id,
        sub_cat_id: req.body.sub_cat_id,
        brand_id: req.body.brand_id,
        status: 1,
      };

        User_auction.create(user_auction)
            .then((data) => {
            res.status(200).send(data);
            })
            .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while create the User_auction",
            });
            });
         
       
    }
};

exports.findAll = (req, res) => {
    User_auction.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving User_auction",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    User_auction.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving User_auction",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    User_auction.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving User_auction with id=" + id,
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
        const id = req.params.id;
        var query = { _id: new Mongoose.Types.ObjectId(id)};
        User_auction.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "User_auction was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update User_auction with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    User_auction.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "User_auction was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete User_auction with id=${id}`,
        });
      }
    });
  };
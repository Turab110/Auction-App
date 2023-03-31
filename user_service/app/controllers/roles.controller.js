const Roles = require("../models/roles.model").roles;
const Mongoose = require("mongoose")

exports.create = (req, res) => {
  if (!req.body.role_name) {
    res.status(400).send({
      message: "role must be filled out!" ,
    });
    return;
  }
  const role = {
    role_name: req.body.role_name,
    status: 1,
  };

  Roles.findOne({ role_name: req.body.role_name })
    .then((data) => {
      if (!data) {
        Roles.create(role)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the role",
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
        message: err.message || "Some error occured while retrieving role",
      });
    });
};

exports.findAll = (req, res) => {
    Roles.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving role",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Roles.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving role",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Roles.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving role with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    if (!req.body.role_name) {
      res.status(400).send({
        message: "role must be filled out!",
      });
      return;
    }
    var query = { _id: new Mongoose.Types.ObjectId(id)};
    Roles.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "role was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update role with id=${id}`,
        });
      }
    });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Roles.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "role was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete role with id=${id}`,
        });
      }
    });
  };
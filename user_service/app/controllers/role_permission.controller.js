const Mongoose = require("mongoose");
const RolePermission = require("../models/role_permission.model").role_permission;

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createRolePerm": {
      return [
        body("role_id", "Role is required").notEmpty(),
        body("main_id", "Mainmenu is required").notEmpty(),
      ];
    }
    case "updateRolePerm": {
      return [
        body("role_id", "Role is required").notEmpty(),
        body("main_id", "Mainmenu is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    let check;
    if (req.body.sub_id == null) {
      const data = await RolePermission.find()
        .where("role_id")
        .equals(req.body.role_id)
        .where("main_id")
        .equals(req.body.main_id)
        .exec();
      if (!data.length) {
        RolePermission.create({
          role_id: req.body.role_id,
          main_id: req.body.main_id,
          status: "1",
        })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while create the Role Permission",
            });
          });
      } else {
        res.status(505).send({
          message: "Sorry! Permission Already assign to this role",
        });
      }
    } else {
      var arr = [];
      for (var subid of req.body.sub_id) {
        var obj;
        value = subid.value;
        const data1 = await RolePermission.find()
          .where("role_id")
          .equals(req.body.role_id)
          .where("main_id")
          .equals(req.body.main_id)
          .where("sub_id")
          .equals(subid.value)
          .exec();
        if (!data1.length) {
          RolePermission.create({
            role_id: req.body.role_id,
            main_id: req.body.main_id,
            sub_id: subid.value,
            status: "1",
          });

          obj = {
            label: subid.label + " Success",
          };
          arr.push(obj);
        } else {
          obj = {
            label: subid.label + " Permission Already assign to this role",
          };
          arr.push(obj);
        }
      }
      return res.status(200).send({
        data: arr,
      });
    }
  }
};

exports.findAll = (req, res) => {
  RolePermission.find().populate("main_id sub_id role_id")
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Data Not Found",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  RolePermission.find({ _id: new Mongoose.Types.ObjectId(id) })
  .populate("main_id sub_id role_id")
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Sorry! Data Not Found With Id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findmain = async (req, res) => {
  const id = req.params.id;
  RolePermission.find({ role_id: new Mongoose.Types.ObjectId(id) })
  .populate("main_id sub_id")
  .then((result) => {
    if (!result.length) {
      res.status(500).send({
        message: "Sorry! Data Not Found With Id=" + id,
      });
    } else {
      res.status(200).send(result);
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
    var query = { _id: new Mongoose.Types.ObjectId(id) };
    RolePermission.findOneAndUpdate(query, req.body, { upsert: true })
    .then((data) => {
        if (!data.length) {
          res.status(200).send({
            message: "Role Permission was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Role Permission with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  RolePermission.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
  .then((data) => {
    if (data) {
      res.status(200).send({
        message: "Role Permission was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete Role Permission with id=${id}`,
      });
    }
  });
};
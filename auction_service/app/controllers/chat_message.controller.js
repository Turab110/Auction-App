const Chat_message = require("../models/chat_message.model").chat_message;
const Mongoose = require("mongoose")
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createChatMessage": {
      return [
        body("chat_id", "Auction id is required").notEmpty(),
        body("sender_id", "Sender id is required").notEmpty(),
        body("receiver_id", "Receiver id is required").notEmpty(),
        body("message", "message is required").notEmpty(),
      ];
    }
    case "updateChatMessage": {
      return [
        body("chat_id", "Auction id is required").notEmpty(),
        body("sender_id", "Sender id is required").notEmpty(),
        body("receiver_id", "Receiver id is required").notEmpty(),
        body("message", "message is required").notEmpty(),
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
      const chat_message = {
        chat_id: req.body.chat_id,
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        message: req.body.message,
        date: req.body.date,
        time: req.body.time,
        status: 1,
      };
      
        Chat_message.create(chat_message)
            .then((data) => {
            res.status(200).send(data);
            })
            .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while create the Chat_message",
            });
            });
       
    }
};

exports.findAll = (req, res) => {
    Chat_message.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Chat_message",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Chat_message.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Chat_message",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Chat_message.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Chat_message with id=" + id,
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
        Chat_message.findOneAndUpdate(query,req.body,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Chat_message was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Chat_message with id=${id}`,
            });
          }
        });
    }
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Chat_message.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Chat_message was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Chat_message with id=${id}`,
        });
      }
    });
  };
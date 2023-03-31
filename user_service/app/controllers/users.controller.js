const JsonWebToken = require("jsonwebtoken");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
var nodeMailer = require("nodemailer");
const config = require("../config/auth");
const User = require("../models/users.model").user;
const Session = require("../models/session.model").session;
var passwordValidator = require('password-validator');
const { NODEMAIL } = require("../config/nodemailer");
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                 // Must have at least 1 digits
.has().symbols(1)                                // Must have at least 1 symbol
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password', 'Password123']); // Blacklist these values

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("username", "Username is required").notEmpty(),
        body("email", "Invalid email").isEmail(),
        body("email", "Email is required").notEmpty(),
        body("phoneNo", "Invalid phone number").optional().isInt(),
        body("phoneNo","Minimum 10 and Maximum 15 number required in Phone number").isLength({ min: 10, max: 15 }),
        body("role_id", "Role is required").notEmpty(),
      ];
    }
    case "updateUser": {
      return [
        body("username", "Username is required").notEmpty(),
        body("email", "Invalid email").isEmail(),
        body("email", "Email is required").notEmpty(),
        body("phoneNo", "Invalid phone number").optional().isInt(),
        body("phoneNo","Minimum 10 and Maximum 15 number required in Phone number").isLength({ min: 10, max: 15 }),
        body("role_id", "Role is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "Status value must be in integer").isInt(),
      ];
    }
    case "changePassword": {
      return [
        body("user_id", "User is required").notEmpty(),
        body("oldPassword", "Old Password is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
        body("oldPassword", "Minimum 8 characters required in Password"),
        body("newPassword", "Minimum 8 characters required in Password").isLength({ min: 8 }),
        body("confirmPassword","Minimum 8 characters required in Password").isLength({ min: 8 }),
      ];
    }
    case "setPassword": {
      return [
        body("email", "Email is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
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

    var randomnumber = Math.random().toString(36).slice(-8);
    User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            User.create({
              username: req.body.username,
              email: req.body.email,
              phoneNo: req.body.phoneNo,
              role_id: req.body.role_id,
              verify_code: randomnumber,
            })
              .then((data) => {
                // SEND VERIFICATION MAIL
                if (data) {
                  var transport = nodeMailer.createTransport({
                    host: NODEMAIL.MAIL_HOST,
                    port: NODEMAIL.MAIL_PORT,
                    secure: true,
                    requireTLS: true,
                    service: NODEMAIL.MAIL_SERVICE,
                    auth: {
                      user: NODEMAIL.MAIL_USER,
                      pass: NODEMAIL.MAIL_PASSWORD,
                    },
                  });
                  var mailOptions = {
                    from: NODEMAIL.MAIL_USER, //sender email address
                    to: data.email, //receiver email address
                    subject: NODEMAIL.MAIL_SUBJECT,
                    text: `Hello ${data.username} \n\n\n You registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
                  };
                  transport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      res.status(501).send({
                        message: error,
                      });
                    } else {
                      console.warn("Email has been sent", info.response);
                      res.status(200).send({
                        message: `Email Verification Code has been sent to your Email Address`,
                        data: data,
                      });
                    }
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while create the User",
                });
              });
          } else {
            res.status(400).send({
              message: "This email address is already associated with another account",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        }); 
  }
};

exports.VerifyCode = async (req, res) => {
  const data = await User.find()
    .where("verify_code")
    .equals(req.body.verify_code)
    .exec();

  if (data.length) {

    const data1 = await User.findOneAndUpdate(
      { _id: new Mongoose.Types.ObjectId(data[0]._id) },
      { is_verified: 1,status: 1 },
      { upsert: true }
    );

    res.status(200).send(data1);

  } else {
    res.status(500).send({
      message: "Some error occured while retrieving User",
    });
  }
};

exports.CheckUserEmail = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        if (user.is_registered == 1) {
          return res.status(200).send({ message: "User Already registered." });
        } else {
          res.status(201).send({
            message: "User not register please set your password",
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.SetUserPassword = (req, res) => {
  const passValidation = schema.validate(req.body.confirmPassword, { details: true })

  User.findOne({ email: req.body.email, is_verified: 1 })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found or not verified." });
      } else {
        if (req.body.newPassword != req.body.confirmPassword) {
          return res.status(401).send({
            message: "New Password and Confirm password not match!",
          });
        } else {
          if(passValidation.length){
            res.status(422).json({ errors: passValidation });
            return;
          }
          var query = { email: req.body.email };
          User.findOneAndUpdate(
            query,
            {
              password: Bcrypt.hashSync(req.body.confirmPassword, 8),
              is_registered: 1,
            },
            { upsert: true }
          ).then((data) => {
            if (data[0] != 0) {
              const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
                expiresIn: config.EXPIRES_IN,
              });

              Session.create({
                userID: user._id,
                token: token,
              })
              .then((sessions) => {
                Session.findOne({ token: token }).then((sessions) => {
                  res.status(200).send({
                    username: user.username,
                    email: user.email,
                    userID: user._id,
                    role_id: user.role_id,
                    accessToken: sessions.token,
                  });
                });
              });
            } else {
              res.status(500).send({
                message: `Cannot update User with id=${req.body._id}`,
              });
            }
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: "Send needed params" });
    return;
  }
  User.findOne({ email: req.body.email, status : 1 })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User does not Exist" });
      } else {
        var passwordIsValid = Bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        } else {
          const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
            expiresIn: config.EXPIRES_IN,
          });

          Session.create({
            userID: user._id,
            token: token,
          })
          .then((sessions) => {
            Session.findOne({ token: token }).then((sessions) => {
              res.status(200).send({
                username: user.username,
                email: user.email,
                userID: user._id,
                role_id: user.role_id,
                accessToken: sessions.token,
              });
            });
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.logout = (req, res) => {
  const accessToken = req.header("auth-token");
  if (!accessToken) {
    res.status(400).send({
      message: "Authorization token cannot be empty!",
    });
  } else {
    Session.findOneAndUpdate(
      { token: accessToken },
      { blacklist: 1 },
      { upsert: true }
    ).then((data) => {
      if (data) {
        res.status(200).send({
          message: "Logout Successfully",
        });
      } else {
        res.status(500).send({
          message: `Can't blacklist User with token=${accessToken}`,
        });
      }
    });
  }
};

exports.ChangePassword = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    User.find({ _id: new Mongoose.Types.ObjectId(req.body.user_id) })
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "User Not Found",
          });
        } else {
          var passwordIsValid = Bcrypt.compareSync(
            req.body.oldPassword,
            data[0].password
          );
          if (!passwordIsValid) {
            res.status(203).send({
              message: "Old Password did not match",
            });
          } else {
            if (req.body.newPassword == req.body.confirmPassword) {
              if (req.body.oldPassword == req.body.newPassword) {
                res.status(203).send({
                  message: "Old Password and New Password couldn't be same",
                });
              } else {
                User.findOneAndUpdate(
                  { _id: new Mongoose.Types.ObjectId(req.body.user_id) }, //where UserId
                  { password: Bcrypt.hashSync(req.body.newPassword, 8) }, // user update
                  { upsert: true }
                ).then((data) => {
                  if (data[0] != 0) {
                    res.status(200).send({
                      message: "User was updated successfully",
                    });
                  } else {
                    res.status(500).send({
                      message: `Cannot update User with id=${req.body.user_id}`,
                    });
                  }
                });
              }
            } else {
              res.status(203).send({
                message: "New Password and Confirm Password did not match",
              });
            }
          }
        }
      })
      .catch((err) => {
        res.status(502).send({
          message: err.message || "Some error occured while retrieving Users",
        });
      });
  }
};

exports.findAll = (req, res) => {
  User.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving User",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  User.find().where('status').equals(1) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Active User",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findAllByRole = (req, res) => {
  const id = req.params.id;
  User.find().where('role_id').equals(id) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving User with Role id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving User with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  var error =[];
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } 
  else {

    if (req.file == undefined) {

      if(!req.body.phoneNo  || req.body.phoneNo == '')
      {
        const user = {
          username: req.body.username,
          status: req.body.status,
        };

        var query = { _id: new Mongoose.Types.ObjectId(id)};
        User.findOneAndUpdate(query,user,{ upsert: true })
          .then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "User was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update User with id=${id}`,
            });
          }
        });
      }
      else
      {
        User.findOne({ _id: new Mongoose.Types.ObjectId(id) ,phoneNo: req.body.phoneNo }) //findAll return array
          .then((data) => {
            if (!data) {
              User.findOne({phoneNo: req.body.phoneNo }) //findAll return array
                .then((data) => {
                  if (!data) {
                    const user = {
                      username: req.body.username,
                      phoneNo: req.body.phoneNo,
                      status: req.body.status,
                    };
            
                    var query = { _id: new Mongoose.Types.ObjectId(id)};
                    User.findOneAndUpdate(query,user,{ upsert: true })
                      .then((data) => {
                      if (data[0] != 0) {
                        res.status(200).send({
                          message: "User was updated successfully",
                        });
                      } else {
                        res.status(500).send({
                          message: `Cannot update User with id=${id}`,
                        });
                      }
                    });
                  } 
                  else {
                    res.status(500).send({
                      message: `Phone number already exist.`,
                    });
                  }
                });
            } 
            else {
                  const user = {
                    username: req.body.username,
                    status: req.body.status,
                  };
          
                  var query = { _id: new Mongoose.Types.ObjectId(id)};
                  User.findOneAndUpdate(query,user,{ upsert: true })
                    .then((data) => {
                    if (data[0] != 0) {
                      res.status(200).send({
                        message: "User was updated successfully",
                      });
                    } else {
                      res.status(500).send({
                        message: `Cannot update User with id=${id}`,
                      });
                    }
                  });
            }
          });
      }
     
    }
    else
    {
          var dp_path;
      
            if (req.file.mimetype != "image/jpeg" &&
                req.file.mimetype != "image/jpg" &&
                req.file.mimetype != "image/png")
              {
                error.push("image type must be jpg, png, jpeg!");
              } 
            else 
            {
              dp_path = req.protocol + "://" + req.get("Host") + "/public/user_picture/" + req.file.filename;
    
              if(!req.body.phoneNo  || req.body.phoneNo == '')
                {
                  const user = {
                    username: req.body.username,
                    profile_image: req.body.dp_path,
                    status: req.body.status,
                  };

                  var query = { _id: new Mongoose.Types.ObjectId(id)};
                  User.findOneAndUpdate(query,user,{ upsert: true })
                    .then((data) => {
                    if (data[0] != 0) {
                      res.status(200).send({
                        message: "User was updated successfully",
                      });
                    } else {
                      res.status(500).send({
                        message: `Cannot update User with id=${id}`,
                      });
                    }
                  });
                }
                else
                {
                  User.findOne({ _id: new Mongoose.Types.ObjectId(id) ,phoneNo: req.body.phoneNo }) //findAll return array
                    .then((data) => {
                      if (!data) {
                        User.findOne({phoneNo: req.body.phoneNo }) //findAll return array
                          .then((data) => {
                            if (!data) {
                              const user = {
                                username: req.body.username,
                                phoneNo: req.body.phoneNo,
                                profile_image: req.body.dp_path,
                                status: req.body.status,
                              };
                      
                              var query = { _id: new Mongoose.Types.ObjectId(id)};
                              User.findOneAndUpdate(query,user,{ upsert: true })
                                .then((data) => {
                                if (data[0] != 0) {
                                  res.status(200).send({
                                    message: "User was updated successfully",
                                  });
                                } else {
                                  res.status(500).send({
                                    message: `Cannot update User with id=${id}`,
                                  });
                                }
                              });
                            } 
                            else {
                              res.status(500).send({
                                message: `Phone number already exist.`,
                              });
                            }
                          });
                      } 
                      else {
                            const user = {
                              username: req.body.username,
                              profile_image: req.body.dp_path,
                              status: req.body.status,
                            };
                    
                            var query = { _id: new Mongoose.Types.ObjectId(id)};
                            User.findOneAndUpdate(query,user,{ upsert: true })
                              .then((data) => {
                              if (data[0] != 0) {
                                res.status(200).send({
                                  message: "User was updated successfully",
                                });
                              } else {
                                res.status(500).send({
                                  message: `Cannot update User with id=${id}`,
                                });
                              }
                            });
                      }
                    });
                }
            }
      } 
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
  .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Mainmenu was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Mainmenu with id=${id}`,
        });
      }
    }
  );
};
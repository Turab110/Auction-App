const Session = require("../models/session.model").session;

exports.findAllSession = (req, res) => {
  const accessToken = req.body.token;
  Session.find() //findAll return array
    .where("token").equals(accessToken)
    .where("blacklist").equals(0)
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Internal Session",
        });
      } else {
        res.status(200).send(data);
      }
    });
};



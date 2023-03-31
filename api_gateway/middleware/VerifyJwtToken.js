const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const { httpStatus } = require("../config/status");
const request = require("request");
const urls = require("../urls");


module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ error: "Access Denied, token required" });
  }

  POST_API = urls.USERS_API_URL + "/auth/session";
  request.post(POST_API,{json: {token:token}},(err, body) => {
    if (err) {
        return console.log(err);
      }
      var body = body.body

      try {
        if (!body.length) {
          return res
            .status(httpStatus.NOT_FOUND)
            .send({ error: "Invalid Token" });
        }

        // const verified = jwt.verify(token, config.SECRET_JWT_CODE);

        // if (!verified) {
        //   return res
        //     .status(httpStatus.UNAUTHORIZED)
        //     .send({ error: "Invalid Token" });
        // }

        // next();
        
      jwt.verify(token, config.SECRET_JWT_CODE,async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        req.userId = decoded.id;

        next();
      });
      } catch (err) {
        return res
          .status(httpStatus.CONFLICT)
          .send({ error: "Something went wrong, token invalid" });
      }
    }
  );
};

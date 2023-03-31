const controller = require("../controllers/chat_message.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_chat_message",controller.validate('createChatMessage'), controller.create);
  app.get("/auction/all_chat_message", controller.findAll);
  app.get("/auction/active_chat_message", controller.findActive);
  app.get("/auction/extract_chat_message/:id", controller.findOne);
  app.put("/auction/update_chat_message/:id",controller.validate('updateChatMessage'), controller.update);
  app.delete("/auction/delete_chat_message/:id", controller.delete);
};

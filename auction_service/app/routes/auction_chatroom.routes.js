const controller = require("../controllers/auction_chatroom.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_chatroom",controller.validate('createAucChatroom'), controller.create);
  app.get("/auction/all_auc_chatroom", controller.findAll);
  app.get("/auction/active_auc_chatroom", controller.findActive);
  app.get("/auction/extract_auc_chatroom/:id", controller.findOne);
  app.put("/auction/update_auc_chatroom/:id",controller.validate('updateAucChatroom'), controller.update);
  app.delete("/auction/delete_auc_chatroom/:id", controller.delete);
};

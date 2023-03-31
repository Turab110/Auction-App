const controller = require("../controllers/auction_bid.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_bid",controller.validate('createAucBid'), controller.create);
  app.get("/auction/all_auc_bid", controller.findAll);
  app.get("/auction/active_auc_bid", controller.findActive);
  app.get("/auction/extract_auc_bid/:id", controller.findOne);
  app.put("/auction/update_auc_bid/:id",controller.validate('updateAucBid'), controller.update);
  app.delete("/auction/delete_auc_bid/:id", controller.delete);
};

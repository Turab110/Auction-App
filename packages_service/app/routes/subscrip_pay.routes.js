const controller = require("../controllers/subscrip_pay.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_subs_pay",controller.validate('createSubsPay'), controller.create);
  app.get("/package/all_subs_pay", controller.findAll);
  app.get("/package/active_subs_pay", controller.findActive);
  app.get("/package/extract_subs_pay/:id", controller.findOne);
  app.put("/package/update_subs_pay/:id",controller.validate('updateSubsPay'), controller.update);
  app.delete("/package/delete_subs_pay/:id", controller.delete);
};

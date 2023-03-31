const controller = require("../controllers/inspection_pay.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/package/add_insp_pay",controller.validate('createInspPay'), controller.create);
  app.get("/package/all_insp_pay", controller.findAll);
  app.get("/package/active_insp_pay", controller.findActive);
  app.get("/package/extract_insp_pay/:id", controller.findOne);
  app.put("/package/update_insp_pay/:id",controller.validate('updateInspPay'), controller.update);
  app.delete("/package/delete_insp_pay/:id", controller.delete);
};

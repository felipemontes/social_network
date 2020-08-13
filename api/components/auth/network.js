const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");

router.post("/login", async (req, res) => {
  try {
    const token = await controller.login(req.body.username, req.body.password);
    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, "Informacion invalida", 400);
  }
});

module.exports = router;

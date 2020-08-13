const express = require("express");
const app = express();
const config = require("../config.js");
const user = require("./components/user/network");
var bodyParser = require("body-parser");
const auth = require("./components/auth/network");
const errors = require("../network/errors");

// Midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Server running on http://localhost:${config.api.port}/api/user`);
});

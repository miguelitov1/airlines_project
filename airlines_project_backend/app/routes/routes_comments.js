"use strict";

const express = require("express");
//const validarAuth = require("../middlewares/validar-auth");

const createComment = require("../controller/create_comment");
const getAllComments = require("../controller/retrieve_comment");

const router = express.Router();

router.route("/").get((req, res) => getAllComments(req, res));

router
  .route("/")
  //.all(validarAuth)
  .post((req, res) => createComment(req, res));

  module.exports = router;
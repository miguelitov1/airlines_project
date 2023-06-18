"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const getAllComments = require('../controller/comments/retrieve_comment');
const createComment = require('../controller/comments/create_comment');


const router = express.Router();

router.route("/").get((req, res) => getAllComments(req, res));

router
  .route("/")
  .all(validarAuth)
  .post((req, res) => createComment(req, res));

  module.exports = router;
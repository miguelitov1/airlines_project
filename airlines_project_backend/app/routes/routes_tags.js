"use strict";

const express = require("express");
//const validateAuth = require("../middlewares/validate_auth");

const getAllTagsByCommentId = require ('../controller/tags/get_tag_by_comment_id')

const router = express.Router();

router.route("/:commentId").get((req, res) => getAllTagsByCommentId(req, res));

module.exports = router;
"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const getAllComments = require('../controller/comments/retrieve_comment');
const createComment = require('../controller/comments/create_comment');
const addTagsToComment = require('../controller/tags/add_tags_to_comment');
const getCommentsByFlightId = require('../controller/comments/retrieve_comments_by_flight')


const router = express.Router();

//public
router.route("/").get((req, res) => getAllComments(req, res));
router.get("/:flightId", (req, res) => getCommentsByFlightId(req, res));

//privates
router
.route("/")
.all(validarAuth)
.post((req, res) => createComment(req, res));

router
.route("/:commentId/tags")
.all(validarAuth)
.post((req, res) => addTagsToComment(req, res));

 module.exports = router;
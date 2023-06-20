"use strict";

const repositoryTags = require("../../repository/repository_tags");
const createErrorJson = require("../../error/create_error_json");

async function getAllTagsByCommentId(req, res) {
  try {

    const { commentId } = req.params;
    //get all tags by the comment id
    const tags = await repositoryTags.getAllTagsByCommentId(commentId);

    res.status(200).send(tags);
  } catch (err) {
    createErrorJson(err, res);
  }
}

module.exports = getAllTagsByCommentId;

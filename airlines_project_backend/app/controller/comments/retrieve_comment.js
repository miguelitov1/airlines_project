"use strict";

const repositoryComments = require("../../repository/repository_comments");
const createErrorJson = require("../../error/create_error_json");

async function getAllComments(req, res) {
  try {

    //get all comments from the DDBB
    const comments = await repositoryComments.get_all_comments();

    res.status(200).send(comments);
  } catch (err) {
    createErrorJson(err, res);
  }
}

module.exports = getAllComments;

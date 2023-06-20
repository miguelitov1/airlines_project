"use strict";

const repositoryComments = require("../../repository/repository_comments");
const repositoryTags = require("../../repository/repository_tags");
const createErrorJson = require("../../error/create_error_json");

async function getCommentsByFlightId(req, res) {
  try {

    //get de flight id from params
    const { flightId:flight_id } = req.params;

    //get all comments from the DDBB of the specific flight
    const comments = await repositoryComments.getCommentsByFlightId(flight_id);

    //get all ids of the comments:
    const commentIds = comments.map(comment => comment.id);

    // get all tags for each comment id
    const tagsByCommentIds = await repositoryTags.getAllTagsByCommentId(commentIds);

    // get the IDs of tags by comment
    const tagIdsByCommentIds = {};
    for (const commentId of commentIds) {
      tagIdsByCommentIds[commentId] = tagsByCommentIds[commentId] || [];
    }

    const tagIds = Object.values(tagIdsByCommentIds).flat();
    const tags = await repositoryTags.getTagsByIds(tagIds);
    const tagNamesByTagIds = {};
    for (const tag of tags) {
      tagNamesByTagIds[tag.id] = tag.tag;
    }

    // join tags names with coments
    const commentsWithTags = comments.map(comment => ({
      ...comment,
      tags: tagIdsByCommentIds[comment.id].map(tagId => tagNamesByTagIds[tagId])
    }));

    res.status(200).send(commentsWithTags);
  } catch (err) {
    createErrorJson(err, res);
  }
}

module.exports = getCommentsByFlightId;
"use strict";

const Joi = require("joi");
const repositoryTags = require("../../repository/repository_tags");
const repositoryComments = require("../../repository/repository_comments");
const crearErrorJson = require("../../error/crear_error_json");

const schema = Joi.object().keys({
  tags: Joi.array().items(Joi.string()).required(),
});

async function addTagsToComment(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { commentId: comment_id } = req.params;
    const { tags } = req.body;

    // Verifying if the tags already exist in the database
    const existingTags = await repositoryTags.getTagsByNames(tags);
    const existingTagNames = existingTags.map((tag) => tag.tag);

    // Creating new tags for those that do not exist in the database
    const newTags = tags.filter((tag) => !existingTagNames.includes(tag));
    await repositoryTags.createTags(newTags);

    // Obtaining the IDs of the tags
    const allTags = await repositoryTags.getTagsByNames([...existingTagNames, ...newTags]);
    const tagIds = allTags.map((tag) => tag.id);

    // Associating the tags with the comment
    await repositoryComments.addTagsToComment(comment_id, tagIds);

    res.status(200).send({ message: "Tags added successfully to the comment." });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = addTagsToComment;
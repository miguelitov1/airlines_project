"use strict";

const Joi = require("joi");
const repositoryComments = require("../../repository/repository_comments");
const createErrorJson = require("../../error/create_error_json");

// Validation schema using Joi
const schema = Joi.object().keys({
    flight_id: Joi.number().positive().required(),
    userComment: Joi.string().max(4000).required(),
  });
  
  async function createComment(req, res) {
    try {
      await schema.validateAsync(req.body);
      
      //take id from loged user 
      const user_id = req.auth.id;

      const {
        flight_id,
        userComment,
      } = req.body;

      // Post comment in te DDBB
      const id = await repositoryComments.post_comment(
        user_id,
        flight_id,
        userComment,
      );
  
      res.status(201).send({ id, user_id, flight_id, userComment });

    } catch (err) {
      createErrorJson(err, res);
    }
  }
  
  module.exports = createComment;
  
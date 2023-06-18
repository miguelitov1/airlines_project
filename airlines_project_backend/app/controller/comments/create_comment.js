"use strict";

const Joi = require("joi");
const repositoryComments = require("../../repository/repository_comments");
const crearErrorJson = require("../../error/crear_error_json");

const schema = Joi.object().keys({
    flight_id: Joi.number().positive().required(),
    userComment: Joi.string().max(4000).required(),
  });
  
  async function createComment(req, res) {
    try {
      await schema.validateAsync(req.body);
      
      const user_id = req.auth.id;

      const {
        flight_id,
        userComment,
      } = req.body;
  
      const id = await repositoryComments.post_comment(
        user_id,
        flight_id,
        userComment,
      );
  
      res.status(201).send({ id, user_id, flight_id, userComment });
    } catch (err) {
      crearErrorJson(err, res);
    }
  }
  
  module.exports = createComment;
  
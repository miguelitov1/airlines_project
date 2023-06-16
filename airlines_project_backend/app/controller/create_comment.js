"use strict";

const Joi = require("joi");
const repositoryComments = require("../repository/repository_comments");
const crearErrorJson = require("../error/crear_error_json");

const schema = Joi.object().keys({
    commentId: Joi.number().positive().required(),
    user_id: Joi.number().positive().required(),
    flight_id: Joi.number().positive().required(),
    userComment: Joi.string().max(4000).required(),
  });
  
  async function createComment(req, res) {
    try {
      await schema.validateAsync(req.body);
  
      //const id_usuario = req.auth.id;
  
      const {
        commentId,
        user_id,
        flight_id,
        userComment,
      } = req.body;
  
      const id = await repositoryComments.put_comment(
        commentId,
        user_id,
        flight_id,
        userComment,
      );
  
      res.status(201).send({ commentId, user_id, flight_id, userComment });
    } catch (err) {
      crearErrorJson(err, res);
    }
  }
  
  module.exports = createComment;
  
"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json()); //sirve para tomar los datos json del postman
app.use(cors());

const routesComments = require("./app/routes/routes");


app.use("/api/v1/airline_project/comments", routesComments);

module.exports = app;

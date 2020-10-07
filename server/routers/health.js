var express = require('express');

module.exports = function (app) {
  var router = express.Router();

  router.get('/', function (req, res, next) {
    res.json([{
      SecretName: 'username',
      SecretValue: process.env.SECRET_USERNAME_ENV_VAR,

    }, {
      SecretName: 'password',
      SecretValue: process.env.SECRET_PASSWORD_ENV_VAR
    }]);
  });

  app.use("/health", router);
}
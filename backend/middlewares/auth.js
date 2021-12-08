const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-err');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('К этому ресурсу есть доступ только для авторизированных пользователей'));
  }

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    next(new ForbiddenError('Ваш токен устарел или не валиден'));
  }

  req.user = payload;

  next();
};

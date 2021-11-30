const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-err');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new ForbiddenError('К этому ресурсу есть доступ только для авторизированных пользователей'));
  }

  let payload;
  try {
    payload = jwt.verify(token, '45ea781744ec7b4e07a1ff7e4adbd95bacff89e3d0266bb0e17a9f12ff31e01e');
  } catch (err) {
    next(new AuthError('Ваш токен устарел или не валиден'));
  }

  req.user = payload;

  next();
};

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { login, setUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errors');
const regExp = require('./regExp/regExp');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT = 3000 } = process.env;
const app = express();

require('dotenv')
  .config();

app.use(cors({
  option: [
    'http://mesto.subb.nomoredomains.rocks',
    'https://mesto.subb.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  origin: [
    'http://mesto.subb.nomoredomains.rocks',
    'https://mesto.subb.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .pattern(regExp),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(8)
        .max(35),
    }),
}), setUser);

app.use(auth);

app.get('/signout', (req, res) => {
  res.status(200)
    .clearCookie('jwt', {
      sameSite: 'None',
      secure: true,
    })
    .send({ message: 'Выход' });
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/notFound'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port:${PORT}`);
});

module.exports = app;

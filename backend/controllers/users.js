const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const AuthErr = require('../errors/auth-err');
const ConflictErr = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('InvalidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Введены некорректные данные'));
      } else if (err.message === 'InvalidId') {
        next(new NotFoundErr(`Пользователь с _id: ${req.params.userId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.setUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about) {
    throw new BadRequestErr('Поля name и about должны быть заполнены');
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new Error('InvalidId'))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.message === 'InvalidId') {
          next(new NotFoundErr(`Пользователь с _id: ${req.user._id}`));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestErr('Переданы некорректные данные при создании пользователя.'));
        } else if (err.name === 'CastError') {
          next(new BadRequestErr('Введен некорректный _id'));
        }
        next(err);
      });
  }
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    throw new BadRequestErr('Поле avatar должно быть заполнено');
  } else {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new Error('InvalidId'))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestErr('Переданы некорректные данные.'));
        } else if (err.name === 'CastError') {
          next(new BadRequestErr('Введен некорректный _id'));
        } else {
          next(err);
        }
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(new Error('InvalidEmail'))

    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new AuthErr('Неправильные email или password'));
          } else {
            const token = jwt.sign(
              { _id: user._id },
              '45ea781744ec7b4e07a1ff7e4adbd95bacff89e3d0266bb0e17a9f12ff31e01e',
              { expiresIn: '7d' },
            );
            res.cookie('token', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })

              .end();
          }
        });
    })
    .catch((err) => {
      if (err.message === 'InvalidEmail') {
        next(new AuthErr('Неправильные email или password'));
      } else {
        next(err);
      }
    });
};

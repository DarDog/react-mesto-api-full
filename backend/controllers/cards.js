const Cards = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.setCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(new Error('InvalidId'))
    .then((card) => {
      if (card.owner.toString() === req.user._id.toString()) {
        card.remove(() => res.status(200)
          .send({ message: 'Карточка успешно удалена' }));
      } else {
        next(new ForbiddenErr('У вас нет прав для удаления этой карточки'));
      }
    })
    .catch((err) => {
      if (err.message === 'InvalidId') {
        next(new NotFoundErr(`Карточка с _id: ${req.params.cardId} не найдена`));
      } else if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.addLikeOnCard = (req, res, next) => {
  console.log(req.params.cardId)
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('InvalidId'))
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.message === 'InvalidId') {
        next(new NotFoundErr(`Карточка с _id: ${req.params.cardId} не найдена`));
      } else {
        next(err);
      }
    });
};

module.exports.removeLikeOnCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('InvalidId'))
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.message === 'InvalidId') {
        next(new NotFoundErr(`Карточка с _id: ${req.params.cardId} не найдена`));
      } else {
        next(err);
      }
    });
};

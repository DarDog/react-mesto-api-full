const router = require('express')
  .Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, setCard, deleteCardById, addLikeOnCard, removeLikeOnCard,
} = require('../controllers/cards');
const regExp = require('../regExp/regExp');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .pattern(regExp)
        .required(),
    }),
}), setCard);
router.delete('/:cardId', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .length(24)
        .hex(),
    }),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .length(24)
        .hex(),
    }),
}), addLikeOnCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .length(24)
        .hex(),
    }),
}), removeLikeOnCard);

module.exports = router;

import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Card({card, ...props}) {
  const currentUser = React.useContext(CurrentUserContext),
      isOwn = card.owner._id === currentUser._id,
      isLiked = card.likes.some(like => like._id === currentUser._id);

  const cardDeleteButtonClassName = (
      `card__delete-button ${isOwn ? 'card__delete-button_visible' : ''}`
  );

  const cardLikeButtonClassName = (
      `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  )

  const handleClick = () => {
    props.onCardClick(card)
  }

  const handleLikeClick = () => {
    props.onCardLike(card)
  }

  const handleCardDelete = () => {
    props.onCardDelete(card)
  }

  return (
      <li className="card">
        <img onClick={handleClick} src={card.link} alt={card.name} className="card__image"/>
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"/>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}/>
      </li>
  )
}

export default Card
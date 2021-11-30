import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Main({ cards, ...props }) {
  const currentUser = React.useContext(CurrentUserContext)
  // console.log(cards)

  return (
      <main className={`main page__main ${props.isLoaded ? '' : 'main_disable'}`}>
        <section className="profile main__profile">
          <div onClick={props.onEditAvatar} className="profile__overlay">
            <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"/>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button onClick={props.onAddPlace} type="button" className="profile__add-button"/>
        </section>
        <section className="elements main__elements">
          <ul className="elements__cards">
            {cards.map(card => {
              return (
                  <Card key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}/>
              )
            })}
          </ul>
        </section>
      </main>
  )
}

export default Main
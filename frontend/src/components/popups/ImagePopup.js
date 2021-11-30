import React from "react";

function ImagePopup({card, ...props}) {
  const closeByClickAtOverlay = (e) => {
    if (e.target.classList.contains('pop-up')) {
      props.onClose()
    }
  }

  return (
      <article onClick={closeByClickAtOverlay} className={`pop-up pop-up_content_image ${ card.link !== '' && 'pop-up_opened'}`}>
        <div className="pop-up__image-container">
          <img src={card.link} alt={card.name} className="pop-up__image"/>
          <h2 className="pop-up__image-title">{card.name}</h2>
          <button onClick={props.onClose} type="button" className="pop-up__exit-button pop-up__exit-button_place_image-pop-up"/>
        </div>
      </article>
  );
}

export default ImagePopup
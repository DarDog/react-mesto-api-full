import React from "react";

function PopupWithForm(props) {

  const closeByClickAtOverlay = (e) => {
    if (e.target.classList.contains('pop-up')) {
      props.onClose()
    }
  }

  return (
      <article onClick={closeByClickAtOverlay} className={`pop-up pop-up_content_${props.name} ${props.isOpen && 'pop-up_opened'}`}>
        <div className="pop-up__background">
          <h2 className="pop-up__title">{props.title}</h2>
          <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button type="submit" className={`form__submit-button ${!props.isValid ? 'form__submit-button_disable' : ''}`} name="submitButton">{props.buttonText}</button>
          </form>
          <button onClick={props.onClose} type="button" className="pop-up__exit-button"/>
        </div>
      </article>
  )
}

export default PopupWithForm
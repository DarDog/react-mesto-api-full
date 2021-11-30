import React from 'react'
import PopupWithForm from "./PopupWithForm";

function ErrorPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAccessError();
  }

  return (
      <PopupWithForm
          isOpen={props.isOpen}
          title={'Ой, что то пошло не так'}
          name={'error'}
          buttonText={'ОК'}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isValid={true}
      >
        <p className={'error_massage'}>{props.errorMassage}</p>
      </PopupWithForm>
  )
}

export default ErrorPopup
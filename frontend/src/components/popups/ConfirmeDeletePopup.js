import React from 'react'
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onConfirmDelete(props.card)
  }

  return (
      <PopupWithForm
          isOpen={props.isOpen}
          title={'Вы уверены?'}
          name={'delete'}
          buttonText={'ДА'}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isValid={true}
      />
  )
}

export default ConfirmDeletePopup
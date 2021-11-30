import React from 'react'

function FormErrors({ errorMassage, isValid }) {
  return (
      <span className={`form__input-error ${!isValid ? 'form__input-error_active' : ''}`}>{errorMassage}</span>
  )
}

export default FormErrors
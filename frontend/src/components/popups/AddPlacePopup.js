import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormErrors from "./FormErrors";

function AddPlacePopup(props) {
  const [name, setName] = React.useState(''),
      [link, setLink] = React.useState(''),
      [isTitleValid, setIsTitleValid] = React.useState(false),
      [titleErrorMassage, setTitleErrorMassage] = React.useState(''),
      [isLinkValid, setIsLinkValid] = React.useState(false),
      [linkErrorMassage, setLinkErrorMassage] = React.useState(''),
      [isFormValid, setIsFormValid] = React.useState(false),
      [submitButtonText, setSubmitButtonText] = React.useState('Создать');

  const handleChangeName = (e) => {
    setName(e.target.value);
    handleTitleInputValid(e);
  }

  const handleChangeUrl = (e) => {
    setLink(e.target.value);
    handleLinkInputValid(e);
  }

  const handleTitleInputValid = (input) => {
    if (!input.target.validity.valid) {
      setIsTitleValid(false);
      setTitleErrorMassage(input.target.validationMessage);
    } else {
      setIsTitleValid(true);
      setTitleErrorMassage('');
    }
  }

  const handleLinkInputValid = (input) => {
    if (!input.target.validity.valid) {
      setIsLinkValid(false);
      setLinkErrorMassage(input.target.validationMessage);
    } else {
      setIsLinkValid(true);
      setLinkErrorMassage('');
    }
  }

  React.useEffect(() => {
    if (!isTitleValid || !isLinkValid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true)
    }
  }, [isTitleValid, isLinkValid, props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddCard({
      name,
      link
    }, setSubmitButtonText)

    setLink('')
    setIsLinkValid(false)
    setName('')
    setIsTitleValid(false)
    setIsFormValid(false)
  }

  return (
      <PopupWithForm
          isOpen={props.isOpen}
          title={'Новое место'}
          name={'add'}
          buttonText={submitButtonText}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isValid={isFormValid}
      >
        <label htmlFor="card-name-input" className="form__field">
          <input type="text"
                 className="form__input"
                 placeholder="Название"
                 name="name"
                 id="card-name-input"
                 required
                 minLength="2"
                 maxLength="30"
                 onChange={handleChangeName}
                 value={name || ''}
          />
          <FormErrors isValid={isTitleValid} errorMassage={titleErrorMassage}/>
        </label>
        <label htmlFor="card-link-input" className="form__field">
          <input type="url"
                 className="form__input"
                 placeholder="Ссылка на картинку"
                 name="link"
                 id="card-link-input"
                 required
                 onChange={handleChangeUrl}
                 value={link || ''}
          />
          <FormErrors isValid={isLinkValid} errorMassage={linkErrorMassage}/>
        </label>
      </PopupWithForm>
  )
}

export default AddPlacePopup
import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import FormErrors from "./FormErrors";

function EditProfilePopup(props) {
  const [name, setName] = React.useState(''),
      [description, setDescription] = React.useState(''),
      [isNameValid, setIsNameValid] = React.useState(false),
      [nameErrorMassage, setNameErrorMassage] = React.useState(''),
      [isDescriptionValid, setIsDescriptionValid] = React.useState(false),
      [descriptionErrorMassage, setDescriptionErrorMassage] = React.useState(''),
      [isFormValid, setIsFormValid] = React.useState(false),
      [submitButtonText, setSubmitButtonText] = React.useState('Сохранить')

  const currentUser = React.useContext(CurrentUserContext);

  const handleChangeName = (e) => {
    setName(e.target.value);
    handleNameInputValid(e);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    handleDescriptionInputValid(e);
  }

  const handleNameInputValid = (input) => {
    if (!input.target.validity.valid) {
      setIsNameValid(false);
      console.log(isNameValid)
      setNameErrorMassage(input.target.validationMessage);
    } else {
      setIsNameValid(true);
      setNameErrorMassage('');
    }
  }

  const handleDescriptionInputValid = (input) => {
    if (!input.target.validity.valid) {
      setIsDescriptionValid(false);
      setDescriptionErrorMassage(input.target.validationMessage);
    } else {
      setIsDescriptionValid(true);
      setNameErrorMassage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    }, setSubmitButtonText);

    setIsFormValid(false)
  }

  React.useEffect(() => {
    if (!isNameValid || !isDescriptionValid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true)
    }
  }, [isNameValid, isDescriptionValid, props.isOpen])

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameValid(true);
    setIsDescriptionValid(true);
  }, [currentUser, props.isOpen])

  return (
      <PopupWithForm
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isValid={isFormValid}
          title={'Редактировать профиль'}
          name={'edit'}
          buttonText={submitButtonText}>
        <label htmlFor="name-input" className="form__field">
          <input type="text"
                 className="form__input"
                 placeholder="Введите ваше имя"
                 name="name"
                 id="name-input"
                 required
                 minLength="2"
                 maxLength="40"
                 value={name || ''}
                 onChange={handleChangeName}
          />
          <FormErrors isValid={isNameValid} errorMassage={nameErrorMassage} />
        </label>
        <label htmlFor="description-input" className="form__field">
          <input type="text"
                 className="form__input"
                 placeholder="Расскажите о себе"
                 name="about"
                 id="description-input"
                 required
                 minLength="2"
                 maxLength="200"
                 value={description || ''}
                 onChange={handleChangeDescription}
          />
          <FormErrors isValid={isDescriptionValid} errorMassage={descriptionErrorMassage} />
        </label>
      </PopupWithForm>
  )
}

export default EditProfilePopup
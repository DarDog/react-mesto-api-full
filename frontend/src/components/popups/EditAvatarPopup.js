import React from "react";
import PopupWithForm from "./PopupWithForm";
import FormErrors from "./FormErrors";

function EditAvatarPopup(props) {
  const [url, setUrl] = React.useState(''),
      [isUrlValid, setIsUrlValid] = React.useState(false),
      [urlErrorMassage, serUrlErrorMassage] = React.useState(''),
      [isFormValid, setIsFormValid] = React.useState(false),
      [submitButtonText, setSubmitButtonText] = React.useState('Сохранить');

  const imageSrcRef = React.useRef('');

  const handleChange = (e) => {
    setUrl(e.target.value);
    handleInputValid(imageSrcRef);
    handleFormValid();
  }

  const handleInputValid = (input) => {
    if (!input.current.validity.valid) {
      setIsUrlValid(false);
      serUrlErrorMassage(input.current.validationMessage);
    } else {
      setIsUrlValid(true);
      serUrlErrorMassage('');
    }
  }

  const handleFormValid = () => {
    if (!imageSrcRef.current.validity.valid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: imageSrcRef.current.value
    }, setSubmitButtonText)

    setUrl('');
    setIsFormValid(false);
  }

  return (
      <PopupWithForm
          isOpen={props.isOpen}
          title={'Обновить аватар'}
          name={'avatar'}
          buttonText={submitButtonText}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          isValid={isFormValid}
      >
        <label htmlFor="card-link-input" className="form__field">
          <input type="url"
                 className="form__input"
                 placeholder="Ссылка на картинку"
                 name="avatar"
                 id="profile-avatar-link-input"
                 required
                 ref={imageSrcRef}
                 onChange={handleChange}
                 value={url}
          />
          <FormErrors errorMassage={urlErrorMassage} isValid={isUrlValid}/>
          <span className="form__input-error profile-avatar-link-input-error"/>
        </label>
      </PopupWithForm>
  )
}

export default EditAvatarPopup
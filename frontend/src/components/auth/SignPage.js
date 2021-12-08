import React from 'react';

function SignPage({context, ...props}) {
  const [login, setLogin] = React.useState(''),
      [isLoginValid, setIsLoginValid] = React.useState(false),
      [loginErrorMassage, setLoginErrorMassage] = React.useState(''),
      [password, setPassword] = React.useState(''),
      [isPasswordValid, setIsPasswordValid] = React.useState(false),
      [passwordErrorMassage, setPasswordErrorMassage] = React.useState(''),
      [isFormValid, setIsFormValid] = React.useState(false)

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    checkLoginValidity(e.target);
  }

  const checkLoginValidity = (input) => {
    if (!input.validity.valid) {
      setIsLoginValid(false);
      setLoginErrorMassage(input.validationMessage);
    } else {
      setIsLoginValid(true);
      setLoginErrorMassage('');
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    checkPasswordValidity(e.target)
  }

  const checkPasswordValidity = (input) => {
    if (!input.validity.valid) {
      setIsPasswordValid(false);
      setPasswordErrorMassage(input.validationMessage);
    } else {
      setIsPasswordValid(true);
      setPasswordErrorMassage('');
    }
  }

  React.useEffect(() => {
    if (isLoginValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false)
    }
  }, [isLoginValid, isPasswordValid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      password: password,
      email: login
    })
  }

  return (
      <>
        <h1 className='auth__title'>{context.title}</h1>
        <form className='auth__form' name={context.formName} onSubmit={handleSubmit} noValidate>
          <input className='form__input form__input_type_auth'
                 minLength="6"
                 placeholder='Email'
                 type="email"
                 required
                 value={login}
                 onChange={handleLoginChange}
          />
          <span className={`form__input-error ${isLoginValid || 'form__input-error_active'}`}>{loginErrorMassage}</span>
          <input className='form__input form__input_type_auth'
                 minLength='6'
                 placeholder='Пароль'
                 type="password"
                 required
                 value={password}
                 onChange={handlePasswordChange}
          />
          <span
              className={`form__input-error ${isPasswordValid || 'form__input-error_active'}`}>{passwordErrorMassage}</span>
          <button
              className={`form__submit-button form__submit-button_type_auth ${isFormValid || 'form__submit-button_disable'}`}
              type='submit'
          >{context.buttonName}</button>
        </form>
      </>
  );
}

export default SignPage
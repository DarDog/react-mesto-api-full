import React from 'react'
import SignPage from "./SignPage";

function SignIn(props) {
  return (
    <article className='auth'>
      <SignPage
          context={{title: 'Вход', buttonName: 'Войти', formName: 'sign-in'}}
          onSubmit={props.onSubmit}
      />
    </article>
  );
}

export default SignIn
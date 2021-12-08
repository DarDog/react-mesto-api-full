import React from 'react';
import failImage from '../../images/fail.svg'
import InfoTooltip from "./InfoTooltip";

function Fail(props) {
  return (
      <InfoTooltip
          isOpen={props.isOpen}
          title={'Что-то пошло не так! Попробуйте ещё раз.'}
          name={'fail'}
          onClose={props.onClose}
          isValid={true}
          image={failImage}
      >
        <p className={'error_massage'}>{props.errorMassage}</p>
      </InfoTooltip>
  );
}

export default Fail
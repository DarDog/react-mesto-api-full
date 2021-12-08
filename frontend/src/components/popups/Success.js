import React from 'react';
import successImage from '../../images/success.svg'
import InfoTooltip from "./InfoTooltip";

function Success(props) {
  return (
      <InfoTooltip
          isOpen={props.isOpen}
          title={'Вы успешно зарегистрировались!'}
          name={'success'}
          onClose={props.onClose}
          isValid={true}
          image={successImage}
      >
        <p className={'error_massage'}>{props.errorMassage}</p>
      </InfoTooltip>
  );
}

export default Success
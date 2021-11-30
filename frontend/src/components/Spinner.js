import React from 'react'

function Spinner(props) {

  return (
      <div className={`spinner spinner_position_main ${props.isLoaded ? 'spinner_disable' : ''}`}/>
  )
}

export default Spinner
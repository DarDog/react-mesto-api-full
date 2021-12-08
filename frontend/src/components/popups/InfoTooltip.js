import React from 'react'

function InfoTooltip(props) {

  const closeByClickAtOverlay = (e) => {
    if (e.target.classList.contains('pop-up')) {
      props.onClose()
    }
  }

  return (
      <article onClick={closeByClickAtOverlay} className={`pop-up pop-up_content_${props.name} ${props.isOpen && 'pop-up_opened'}`}>
        <div className="pop-up__background">
          <img className='pop-up__status-image' src={props.image} alt={props.name}/>
          <h2 className="pop-up__title">{props.title}</h2>
          <button onClick={props.onClose} type="button" className="pop-up__exit-button"/>
        </div>
      </article>
  );
}



export default InfoTooltip
import React from 'react'
import "./Modal.css"

const Modal = ({header, body, footer}) => {
  return (
    <div className="whole__moadal__component">
    <div className="modal__content">
        <div className="modal__header">
            {header}
        </div>
        <div className="modal__body">
            {body}
        </div>
        <div className="modal__footer">{footer}</div>
    </div>
      
    </div>
  )
}

export default Modal

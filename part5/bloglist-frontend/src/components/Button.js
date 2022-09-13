
import React from 'react'


const Button = ({ type, className, children, onClick, dataCy }) => (
  <button data-cy={dataCy} className={className} type={type} onClick={onClick}>
    {children}
  </button>
)

export default Button
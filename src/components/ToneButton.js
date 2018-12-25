import React from 'react';

const ToneButton = props => {
  const cssClass = props.isActive ? 'active' : ''
  return (
    <button 
      onClick={props.asyncToggleTone}
      className={`tone-button ${cssClass}`}>
    </button>
  )
}

export default ToneButton;
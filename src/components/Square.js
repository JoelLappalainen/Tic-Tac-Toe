import React from 'react';
import './Square.scss';

const Square = props => {
  return (
    <div onClick={props.onClick} className="column square">
      {props.value}
    </div>
  );
};

export default Square;

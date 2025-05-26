import React from 'react';
import './CDSpin.css'; // We'll add styles here

const CDSpin = () => {
  return (
    <div className="cd-wrapper">
      <img 
        src="/vinyl.jpeg" 
        alt="Spinning CD" 
        className="spinning-cd" 
      />
    </div>
  );
};

export default CDSpin;

import React, { useState } from 'react';

const DottedButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500); // Reset the animation after 500ms
  };

  return (
    <button
      onClick={handleClick}
      style={{
        borderRadius: '16px',
        borderWidth: '2px',
        borderStyle: 'dashed',
        borderColor: 'black',
        backgroundColor: 'white',
        padding: '12px 24px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'black',
        transition: 'all 0.3s',
        transform: clicked ? 'translateX(-4px) translateY(-4px)' : 'none',
        boxShadow: clicked ? '4px 4px 0px black' : 'none',
      }}
    >
      LOGIN
      <span
        style={{
          display: 'inline-block',
          marginLeft: '10px',
          transition: 'transform 0.5s',
          transform: clicked ? 'translateX(20px)' : 'none',
        }}
      >
        →
      </span>
    </button>
  );
};

export default DottedButton;

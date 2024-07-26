import React, { useEffect, useState } from "react";
import './RockToast.scss';

const RockToast = ({ message, duration, onClose, position = "top-right" }) => {
  const [animationStyle, setAnimationStyle] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    const animationDuration = (duration / 1000).toFixed(2);
    setAnimationStyle({
      animation: `countdown ${animationDuration}s linear forwards`,
    });

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div className={`rock-toast rock-toast-${position}`}>
      <div className="rock-toast-container">
        <p>{message}</p>
        <div className="rock-toast-animation" style={animationStyle}></div>
      </div>
    </div>
  );
};

export default RockToast;

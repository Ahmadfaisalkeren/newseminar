// Step.js
import React from 'react';

const Step = ({ stepNumber, stepName, isActive, isCompleted }) => {
  return (
    <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
      <div className="circle">
        {isCompleted ? '✔️' : isActive ? '🔵' : '⚪'}
      </div>
      <div className="step-name">{stepNumber}. {stepName}</div>
    </div>
  );
};

export default Step;

// Timeline.js
import React from "react";
import Step from "./Step";

const Timeline = ({ step_name, step_number }) => {
    const steps = Array(step_number)
        .fill()
        .map((_, index) => ({
            name: step_name,
            number: index + 1,
            isActive: index + 1 === step_number,
            isCompleted: index + 1 < step_number,
        }));

    return (
        <div className="timeline">
            {steps.map((step, index) => (
                <Step
                    key={index}
                    stepNumber={step.number}
                    stepName={step.name}
                    isActive={step.isActive}
                    isCompleted={step.isCompleted}
                />
            ))}
        </div>
    );
};

export default Timeline;

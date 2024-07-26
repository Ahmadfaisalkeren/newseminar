import React from "react";
import SeminarLogo from "../../../assets/seminar.jpg";

const Hero = () => {
    return (
        <div className="mt-5 container mx-auto p-5 lg:p-0">
            <div className="grid grid-cols-2 gap-3 min-h-[300px]">
                <div className="colspan-6 flex items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">
                            Welcome to Seminar Website
                        </h1>
                        <p className="text-secondary">
                            Let's Join Seminar for better future
                        </p>
                    </div>
                </div>
                <div className="colspan-6 flex items-center">
                    <div>
                        <img src={SeminarLogo} alt="Image Not Found" />
                        <p className="text-secondary text-center font-medium text-base">
                            Image by storyset on Freepik
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

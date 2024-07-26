import React from "react";
import echo from "./echo";

const TestBroadcast = () => {
    useEffect(() => {
        echo.channel("test-channel").listen("TestEvent", (e) => {
            console.log("Test event received:", e.message);
            alert("Test event received: " + e.message);
        });

        return () => {
            echo.leaveChannel("test-channel");
        };
    }, []);

    return <div>Listening for test events...</div>;
};

export default TestBroadcast;

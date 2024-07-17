import React, { useState, useEffect } from 'react';

const ElapsedTimeCounter = () => {
    const [startTimestamp] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startTimestamp);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [startTimestamp]);

    const formatElapsedTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return <div>{formatElapsedTime(elapsedTime)} elapsed</div>;
};

export default ElapsedTimeCounter;

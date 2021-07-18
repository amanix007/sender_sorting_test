import React, { ReactElement } from 'react'
import Countdown, { CountdownTimeDelta } from 'react-countdown';

const Completionist = () => <span>Time Out !!</span>;


const renderer = ({ hours, minutes, seconds, completed }: CountdownTimeDelta) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
};
interface Props {
    onTimeComplete: any;
}

export default function Timer({ onTimeComplete}: Props): ReactElement {
    return (
        <div>
            <Countdown
                date={Date.now() + 5000}
                renderer={renderer}
                onComplete={() => onTimeComplete}
            />
        </div>
    )
}

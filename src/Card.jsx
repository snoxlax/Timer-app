import ButtonContainer from './ButtonContainer'
import ResetButton from './ResetButton'
import Count from './Count'
import Title from './Title'
import { useEffect, useState } from 'react'
import CountButton from './CountButton'

export default function Card() {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);

    useEffect(() => {
        let interval
        if (isActive) {
            interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(interval)
                    setIsActive(false);
                } else {
                    if (seconds === 0) {
                        setMinutes(prev => prev - 1);
                        setSeconds(59);
                    } else
                        setSeconds(prev => prev - 1)
                }
            }, 1000);
        }

        return () => clearInterval(interval)
    }, [minutes, seconds, isActive]);



    const handleStop = () => {
        setSeconds(0);
        setMinutes(5);
        setIsActive(false);
    }

    const handlePasue = () => {
        setIsActive(false);
    }

    const handleStart = () => {
        setIsActive(true);
    }

    return (
        <div className={`card ${""}`}>
            <Title />
            <Count>
                {`0${minutes}:`}{seconds > 9 ? `${seconds}` : `0${seconds}`}
            </Count>

            <ResetButton onClick={handleStop} />

            <ButtonContainer>
                <CountButton type="play" onClick={handleStart} />
                <CountButton type="pause" onClick={handlePasue} />
                <CountButton type="stop" onClick={handleStop} />
            </ButtonContainer>
        </div>
    )
}

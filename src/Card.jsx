import ButtonContainer from './ButtonContainer'
import ResetButton from './ResetButton'
import Count from './Count'
import Title from './Title'
import { useEffect, useState } from 'react'
import CountButton from './CountButton'

export default function Card() {
    const [isActive, setIsActive] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(5);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [inputMinActiveChange, setInputMinActiveChange] = useState(false)
    const [inputSecActiveChange, setInputSecActiveChange] = useState(false)

    const handleChangeMinutes = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 2) {
            setInputMinutes(value);
        }
    }


    const handleChangeSeconds = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 2) {
            setInputSeconds(value);
        }
    }


    useEffect(() => {
        let interval
        if (isActive) {
            interval = setInterval(() => {
                if (inputMinutes == 0 && inputSeconds == 0) {
                    clearInterval(interval)
                    setIsActive(false);
                    console.log("timer stoped");
                } else if (inputSeconds == 0 && inputMinutes != 0) {
                    console.log(inputMinutes);
                    setInputMinutes(prev => prev - 1);
                    setInputSeconds(59);
                } else {
                    console.log(inputMinutes);
                    setInputSeconds(prev => prev - 1)
                }
            }, 1000);
        }

        return () => clearInterval(interval)
    }, [inputMinutes, inputSeconds, isActive]);


    const handleStop = () => {
        setIsActive(false);
        setInputMinutes(0)
        setInputSeconds(0)
    }

    const handlePasue = () => {
        setIsActive(false);
    }

    const handleStart = () => {
        if (inputSeconds !== 0 || inputMinutes !== 0)
            setIsActive(true);
    }

    return (
        <div className={`card ${""}`}>
            <Title />
            <Count>
                {inputMinActiveChange ? (
                    <>
                        <input
                            onChange={handleChangeMinutes}
                            onBlur={() => setInputMinActiveChange(false)}
                            type="number"
                            placeholder="00"
                            className="time"
                            value={inputMinutes}
                            autoFocus
                        />
                    </>
                ) : (
                    <>
                        <span className="time" onClick={() => setInputMinActiveChange(true)}>{inputMinutes >= 10 || inputMinutes.length >= 2 ? inputMinutes : `0${inputMinutes}`}</span>
                    </>
                )}
                {":"}
                {inputSecActiveChange ? (
                    <>
                        <input
                            onChange={handleChangeSeconds}
                            onBlur={() => setInputSecActiveChange(false)}
                            type="number"
                            placeholder="00"
                            className="time"
                            value={inputSeconds}
                            autoFocus
                        />
                    </>
                ) : (
                    <>
                        <span className="time" onClick={() => setInputSecActiveChange(true)}>{inputSeconds >= 10 || inputSeconds.length >= 2 ? inputSeconds : `0${inputSeconds}`}</span>
                    </>
                )}

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

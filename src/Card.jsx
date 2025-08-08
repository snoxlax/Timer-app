import ButtonContainer from './ButtonContainer';
import ResetButton from './ResetButton';
import Count from './Count';
import Title from './Title';
import { useEffect, useRef, useState } from 'react';
import CountButton from './CountButton';
import { getCurrentTimeMs, setTime, timeDiff } from '../utils/time';

export default function Card() {
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [inputMinActiveChange, setInputMinActiveChange] = useState(false);
  const [inputSecActiveChange, setInputSecActiveChange] = useState(false);
  const endTimeRef = useRef(null);

  const handleChangeMinutes = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setInputMinutes(value);
    }
  };

  const handleChangeSeconds = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setInputSeconds(value);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const { min, sec } = timeDiff(getCurrentTimeMs(), endTimeRef.current);

      setInputMinutes(min);
      setInputSeconds(sec);

      if (min === 0 && sec === 0) {
        clearInterval(interval);
        setIsActive(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStop = () => {
    setIsActive(false);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const handlePasue = () => {
    setIsActive(false);
  };

  const handleStart = () => {
    if (inputSeconds !== 0 || inputMinutes !== 0) {
      endTimeRef.current = setTime(inputMinutes, inputSeconds);

      setIsActive(true);
    }
  };

  return (
    <div className={`card ${''}`}>
      <Title />
      <Count>
        {inputMinActiveChange ? (
          <>
            <input
              onChange={handleChangeMinutes}
              onBlur={() => setInputMinActiveChange(false)}
              type="number"
              placeholder="00"
              className="timeInput"
              value={inputMinutes}
              autoFocus
            />
          </>
        ) : (
          <>
            <span onClick={() => setInputMinActiveChange(true)}>
              {inputMinutes >= 10 || inputMinutes.length >= 2
                ? inputMinutes
                : `0${inputMinutes}`}
            </span>
          </>
        )}
        {':'}
        {inputSecActiveChange ? (
          <>
            <input
              onChange={handleChangeSeconds}
              onBlur={() => setInputSecActiveChange(false)}
              type="number"
              placeholder="00"
              className="timeInput"
              value={inputSeconds}
              autoFocus
            />
          </>
        ) : (
          <>
            <span onClick={() => setInputSecActiveChange(true)}>
              {inputSeconds >= 10 || inputSeconds.length >= 2
                ? inputSeconds
                : `0${inputSeconds}`}
            </span>
          </>
        )}
      </Count>

      <ResetButton onClick={handleStop} />

      <ButtonContainer>
        <CountButton
          type="play"
          onClick={handleStart}
        />
        <CountButton
          type="pause"
          onClick={handlePasue}
        />
        <CountButton
          type="stop"
          onClick={handleStop}
        />
      </ButtonContainer>
    </div>
  );
}

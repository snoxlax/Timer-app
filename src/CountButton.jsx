import { PlayIcon, PauseIcon, StopIcon } from '@radix-ui/react-icons'

export default function CountButton({ type, onClick, locked }) {
    const handleClick = (e) => {
        onClick();
        e.currentTarget.blur();
    }
    return (
        <button disabled={locked} className="count-btn" onClick={handleClick}>
            {type === 'play' && <PlayIcon className="count-btn-icon" />}
            {type === 'pause' && <PauseIcon className="count-btn-icon" />}
            {type === 'stop' && <StopIcon className="count-btn-icon" />}
        </button>
    )
}

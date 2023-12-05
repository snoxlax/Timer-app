import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({ onClick }) {
    return (
        <button className="reset-btn" onClick={(e) => {
            onClick();
            e.currentTarget.blur();
        }}>
            <ResetIcon className="reset-btn-icon" />
        </button>
    )
}

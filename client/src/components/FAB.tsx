import { FaPlus } from "react-icons/fa";
import "../styles/FAB.css";

interface FABProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function FAB({ onClick, disabled = false }: FABProps) {
  return (
    <button
      className={`fab ${disabled ? "fab-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <FaPlus />
    </button>
  );
}
import "../styles/ConfirmModal.css";

interface ConfirmModalProps {
  mode: "warning" | "error";
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({mode, title, message, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          {mode === "warning" && <button className="modal-btn cancel" onClick={onClose}>Cancel</button>}
          <button className="modal-btn confirm" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
}

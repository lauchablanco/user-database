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
      <div className={`modal-content modal-${mode}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {mode === "warning" && <button className="modal-btn cancel" onClick={onClose}>Cancel</button>}
          <button className="modal-btn confirm" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
}

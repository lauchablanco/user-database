import "../styles/ConfirmModal.css";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-btn confirm" onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}

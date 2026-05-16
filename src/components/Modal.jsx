export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-backdrop" onClick={onClose} aria-label="Tutup" />
      <div className="modal-card">
        <div className="modal-head">
          <div className="modal-title">{title}</div>
          <button className="iconbtn" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}


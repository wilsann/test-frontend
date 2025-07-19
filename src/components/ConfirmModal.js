import React from "react";

function ConfirmModal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Konfirmasi Hapus</h3>
        <p>{message}</p>
        <div style={styles.modalButtons}>
          <button onClick={onConfirm} style={styles.btnDelete}>
            Hapus
          </button>
          <button onClick={onClose} style={styles.btnCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "15px",
  },
  btnDelete: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  btnCancel: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ConfirmModal;
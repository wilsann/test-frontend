import React from "react";

function ConfirmModal({ show, onClose, onConfirm, message }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Konfirmasi Hapus</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition duration-200"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
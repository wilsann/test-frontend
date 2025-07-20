import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div style={styles.container}>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={currentPage === page ? styles.active : styles.button}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        marginTop: "20px",
    },
    button: {
        margin: "0 5px",
        padding: "5px 10px",
        cursor: "pointer",
        background: "#ddd",
        border: "none",
        borderRadius: "4px",
    },
    active: {
        margin: "0 5px",
        padding: "5px 10px",
        cursor: "pointer",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
    },
};

export default Pagination;
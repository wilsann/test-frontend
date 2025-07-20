import React from "react";

function FilterBar({ categories, years, onFilter }) {
    const handleFilter = (e) => {
        const category = e.target.form[0].value;
        const year = e.target.form[1].value;
        onFilter(category, year);
        e.preventDefault();
    };

    return (
        <form onSubmit={handleFilter} style={styles.form}>
            <select onChange={handleFilter} style={styles.select}>
                <option value="">Semua Genre</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select onChange={handleFilter} style={styles.select}>
                <option value="">Semua Tahun</option>
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
}

const styles = {
    form: {
        textAlign: "center",
        marginBottom: "20px",
    },
    select: {
        marginRight: "10px",
        padding: "5px",
    },
};

export default FilterBar;
import React from "react";

function FilterBar({ categories, years, onFilter }) { // [cite: 25]
    const handleFilter = (e) => { // [cite: 25]
        const category = e.target.form[0].value; 
        const year = e.target.form[1].value; 
        onFilter(category, year); 
        e.preventDefault(); 
    };

    return (
        <form onSubmit={handleFilter} className="text-center mb-5"> {/* [cite: 29, 30] Refactored form style */}
            <select onChange={handleFilter} className="mr-2.5 p-1.5 border border-gray-300 rounded-md"> {/* [cite: 26, 30] Refactored select style */}
                <option value="">Semua Genre</option> {/* [cite: 26] */}
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat} {/* [cite: 27] */}
                    </option>
                ))}
            </select>

            <select onChange={handleFilter} className="mr-2.5 p-1.5 border border-gray-300 rounded-md"> {/* [cite: 27, 30] Refactored select style */}
                <option value="">Semua Tahun</option> {/* [cite: 28] */}
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year} {/* [cite: 28] */}
                    </option>
                ))}
            </select>
        </form>
    );
}

export default FilterBar;
import React, { useState, useEffect } from "react";

const YearSelector = ({ onSelectYear, selectedYear }) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const [internalSelectedYear, setInternalSelectedYear] = useState(
        selectedYear || currentYear
    );
    const [availablePastYears, setAvailablePastYears] = useState([]);

    useEffect(() => {
        const years = [];
        for (let year = currentYear - 1; year >= currentYear - 2; year--) {
            years.push(year);
        }
        setAvailablePastYears(years);

        if (
            internalSelectedYear < currentYear - 2 || internalSelectedYear > currentYear
        ) {
            setInternalSelectedYear(currentYear);
            onSelectYear(currentYear);
        }
    }, [currentYear, internalSelectedYear, onSelectYear]);

    const handleChange = (event) => {
        const year = parseInt(event.target.value, 10);
        setInternalSelectedYear(year);
        onSelectYear(year);
    };

    return (
        <div className="relative inline-block text-white">
            <select
                value={internalSelectedYear}
                onChange={handleChange}
                className="appearance-none bg-[var(--secondary2)] border border-neutral-700 text-white py-1.5 pl-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent cursor-pointer text-sm"
            >
                <option value={currentYear}>Current ({currentYear})</option>
                {availablePastYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z" />
                </svg>
            </div>
        </div>
    );
};

export default YearSelector;

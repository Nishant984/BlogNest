import React, { useState, useEffect } from 'react';
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format, startOfYear, endOfYear, eachDayOfInterval } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import YearSelector from "./YearSelector";

const HeatmapCalendar = ({ data, onYearChange }) => {
    const today = new Date();
    const currentCalendarYear = today.getFullYear();

    const [selectedYearMode, setSelectedYearMode] = useState(currentCalendarYear);

    let startDate;
    let endDate;

    if (selectedYearMode === currentCalendarYear) {
        startDate = subDays(today, 366);
        endDate = today;
    } else {
        const actualYearStart = startOfYear(new Date(selectedYearMode, 0, 1));
        startDate = subDays(actualYearStart, 1);
        endDate = endOfYear(new Date(selectedYearMode, 0, 1));
    }

    useEffect(() => {
        if (onYearChange) {
            onYearChange(selectedYearMode);
        }
    }, [selectedYearMode, onYearChange]);

    const allDatesInRange = eachDayOfInterval({ start: startDate, end: endDate });

    const dataMap = new Map();
    data.forEach(item => {
        dataMap.set(format(new Date(item.date), "yyyy-MM-dd"), item.count);
    });

    const heatmapValues = allDatesInRange.map(date => {
        const formattedDate = format(date, "yyyy-MM-dd");
        const count = dataMap.get(formattedDate) || 0;
        return { date: formattedDate, count };
    });

    return (
        <div className="bg-[var(--secondary5)] p-4 rounded-xl shadow-lg overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white flex flex-row items-center gap-1 md:text-lg">
                    Post Activity ({selectedYearMode === currentCalendarYear ? 'Past Year' : selectedYearMode})
                    <span
                        data-tooltip-id="info-tooltip" 
                        data-tooltip-content="Activity data is limited to the current year and the two preceding years - BlogNest Team" 
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="0.75"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400 hover:text-[var(--Accent1)] transition-colors"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                        />
                        </svg>
                    </span>
                </h3>
                <YearSelector onSelectYear={setSelectedYearMode} selectedYear={selectedYearMode} />
            </div>

            <div>
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={heatmapValues}
                    blockSize={10}
                    gutter={1}
                    classForValue={(value) => {
                        if (!value || value.date === format(subDays(startOfYear(new Date(selectedYearMode, 0, 1)), 1), "yyyy-MM-dd")) {
                            return "color-empty";
                        }
                        if (value.count === 0) return "color-empty";
                        if (value.count >= 4) return "color-scale-4";
                        if (value.count >= 3) return "color-scale-3";
                        if (value.count >= 2) return "color-scale-2";
                        return "color-scale-1";
                    }}
                    transformDayElement={(element, value, index) => {
                        return React.cloneElement(element, { rx: 2, ry: 2 });
                    }}
                    tooltipDataAttrs={(value) => {
                        if (!value || value.date === format(subDays(startOfYear(new Date(selectedYearMode, 0, 1)), 1), "yyyy-MM-dd")) {
                            return null;
                        }
                        const formattedDate = format(new Date(value.date), "MMM d, yyyy");
                        const count = value.count;

                        const tooltipContent = `${count} submission${count !== 1 ? "s" : ""} on ${formattedDate}`;

                        return {
                            "data-tooltip-id": "heatmap-tooltip",
                            "data-tooltip-content": tooltipContent,
                        };
                    }}
                />
                <div className="flex justify-end items-center gap-1 mt-4 text-white text-xs md:text-sm px-2">
                    <span className="flex items-center">Less
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[var(--secondary)] ml-2"></span>
                    </span>
                    <span className="flex items-center">
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#033A16]"></span>
                    </span>
                    <span className="flex items-center">
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#196C2E]"></span>
                    </span>
                    <span className="flex items-center">
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#2EA043]"></span>
                    </span>
                    <span className="flex items-center">
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#56D364] mr-2"></span>
                        More
                    </span>
                </div>
                <ReactTooltip id="heatmap-tooltip" />
                <ReactTooltip id="info-tooltip" place="top" effect="solid" />
            </div>
        </div>
    );
};

export default HeatmapCalendar;
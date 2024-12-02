import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ tasks, onFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const lowerCaseQuery = query.toLowerCase();
        const filtered = Object.keys(tasks).reduce((acc, key) => {
            acc[key] = tasks[key].filter((task) =>
                task.title.toLowerCase().includes(lowerCaseQuery)
            );
            return acc;
        }, {});
        onFilter(filtered);
    };

    const handleSortChange = (event) => {
        const key = event.target.value;
        setSortKey(key);

        const sorted = Object.keys(tasks).reduce((acc, columnKey) => {
            acc[columnKey] = [...tasks[columnKey]].sort((a, b) => {
                if (key === 'name') {
                    return a.title.localeCompare(b.title);
                } else if (key === 'date') {
                    return new Date(a.createdTime) - new Date(b.createdTime);
                }
                return 0;
            });
            return acc;
        }, {});
        onFilter(sorted);
    };

    return (
        <div className="search-container">
            <div className="left-search">
                <label htmlFor="search-input" className="search-label">
                    Search:
                </label>
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search by title"
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="right-search">
                <label htmlFor="sort-select" className="sort-label">
                    Sort By:
                </label>
                <select
                    id="sort-select"
                    className="sort-select"
                    value={sortKey}
                    onChange={handleSortChange}
                >
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                </select>
            </div>
        </div>
    );
};

export default Searchbar;

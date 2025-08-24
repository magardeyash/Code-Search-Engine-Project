import React, { useState, useEffect } from 'react'

function History() {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setHistory(savedHistory);
        setFilteredHistory(savedHistory);
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredHistory(history);
        } else {
            const filtered = history.filter(entry => 
                entry.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.time.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredHistory(filtered);
        }
    }, [searchTerm, history]);

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all search history?')) {
            localStorage.removeItem("searchHistory");
            setHistory([]);
            setFilteredHistory([]);
        }
    };

    const handleDeleteEntry = (index) => {
        const updated = [...history];
        updated.splice(index, 1);
        setHistory(updated);
        localStorage.setItem("searchHistory", JSON.stringify(updated));
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else if (diffInHours < 168) {
            return `${Math.floor(diffInHours / 24)}d ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const getResultCount = (entry) => {
        try {
            const parsed = typeof entry.result === 'string' ? JSON.parse(entry.result) : entry.result;
            const resultArray = Array.isArray(parsed) ? parsed : parsed?.results || [];
            return resultArray.length;
        } catch (e) {
            return 0;
        }
    };

    return (
        <div className="min-h-screen gradient-bg py-12 px-6">
            <div className="max-w-6xl mx-auto fade-in">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                        Search History
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        View and manage your previous search queries and results.
                    </p>
                </div>

                <div className="gradient-card p-6 rounded-2xl mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">{history.length}</div>
                                <div className="text-gray-300 text-sm">Total Searches</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {history.reduce((acc, entry) => acc + getResultCount(entry), 0)}
                                </div>
                                <div className="text-gray-300 text-sm">Total Results</div>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    className="search-input rounded-xl px-4 py-2 pr-10 text-white placeholder-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button 
                                onClick={handleClearAll} 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors duration-300 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {searchTerm ? 'No matching history found' : 'No search history found'}
                            </h3>
                            <p className="text-gray-400">
                                {searchTerm ? 'Try different search terms' : 'Start searching to build your history'}
                            </p>
                        </div>
                    ) : (
                        filteredHistory.map((entry, idx) => {
                            const resultCount = getResultCount(entry);
                            let resultArray = [];

                            try {
                                const parsed = typeof entry.result === 'string' ? JSON.parse(entry.result) : entry.result;
                                resultArray = Array.isArray(parsed) ? parsed : parsed?.results || [];
                            } catch (e) {
                                resultArray = [];
                            }

                            return (
                                <div key={idx} className="result-card p-6 rounded-2xl slide-in" style={{animationDelay: `${idx * 0.05}s`}}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-bold text-lg text-white">"{entry.query}"</h3>
                                                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                                    {resultCount} result{resultCount !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {formatTime(entry.time)}
                                                </div>
                                                <span>•</span>
                                                <span>{entry.time}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteEntry(history.indexOf(entry))}
                                            className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-500/10 rounded-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {resultArray.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-blue-300 text-sm">Results:</h4>
                                            <div className="grid gap-3">
                                                {resultArray.slice(0, 3).map((item, i) => (
                                                    <div key={i} className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-green-500">
                                                        <p className="font-semibold text-green-300 text-sm mb-1">{item.file}</p>
                                                        <p className="text-gray-300 text-xs line-clamp-2">
                                                            <code className="bg-gray-700 px-1 rounded">{item.snippet}</code>
                                                        </p>
                                                    </div>
                                                ))}
                                                {resultArray.length > 3 && (
                                                    <p className="text-gray-400 text-sm text-center">
                                                        +{resultArray.length - 3} more results
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {resultArray.length === 0 && (
                                        <div className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-red-500">
                                            <p className="text-red-400 text-sm">No valid results found</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default History


import React, { useState } from 'react'

function Searcher() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-500 text-black px-1 rounded">$1</mark>');
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        setHasSearched(true);
        
        try {
            const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.results || []);
            
            // Save search to history
            const historyEntry = {
                query: query,
                time: new Date().toISOString(),
                result: JSON.stringify(data.results || [])
            };
            
            const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
            existingHistory.unshift(historyEntry);
            localStorage.setItem("searchHistory", JSON.stringify(existingHistory.slice(0, 50)));
            
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const queryWords = query.trim().toLowerCase().split(/\s+/);

    return (
        <div id="searcher" className="min-h-screen gradient-bg py-12 px-6">
            <div className="max-w-4xl mx-auto fade-in">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                        Code Search Engine
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Search through your codebase with lightning-fast precision. Find functions, variables, and code snippets instantly.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <div className="relative w-full max-w-2xl">
                        <div className="search-input rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search your code here... (e.g., function, variable, algorithm)"
                                className="bg-transparent w-full text-white outline-none text-lg placeholder-gray-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <button 
                        className="gradient-button text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSearch}
                        disabled={isLoading || !query.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Searching...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </>
                        )}
                    </button>
                </div>

                <div className="space-y-6">
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-300 text-lg">Searching your codebase<span className="loading-dots"></span></p>
                        </div>
                    )}

                    {!isLoading && hasSearched && (
                        <div className="space-y-4">
                            {results.length > 0 ? (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Found {results.length} result{results.length !== 1 ? 's' : ''}
                                        </h2>
                                        <p className="text-gray-400">for "{query}"</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {results.map((res, idx) => (
                                            <div key={idx} className="result-card p-6 rounded-2xl slide-in" style={{animationDelay: `${idx * 0.1}s`}}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="font-bold text-lg text-blue-300">{res.file}</h3>
                                                </div>
                                                <div className="code-block">
                                                    <pre className="text-sm text-green-300 leading-relaxed">
                                                        {highlightText(res.snippet, queryWords)}
                                                    </pre>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                                    <p className="text-gray-400">Try different keywords or check your search query</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!hasSearched && !isLoading && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Ready to search?</h3>
                            <p className="text-gray-400">Enter your search query above to find code in your codebase</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Searcher;

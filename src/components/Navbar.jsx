import React from 'react';
import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className="py-6 px-6 gradient-bg text-white font-bold flex gap-4 flex-wrap justify-between items-center glass sticky top-0 z-50 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">CS</span>
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    CodeSearchEngine
                </h2>
            </div>
            
            <ul className="flex gap-x-6 font-medium items-center">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isActive ? 'bg-white/20 text-blue-300 active' : 'text-gray-300 hover:text-white'
                        }`
                    }
                    end
                >
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </li>
                </NavLink>
                
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                        `nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isActive ? 'bg-white/20 text-blue-300 active' : 'text-gray-300 hover:text-white'
                        }`
                    }
                >
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About
                    </li>
                </NavLink>
                
                <NavLink 
                    to="/codebase" 
                    className={({ isActive }) => 
                        `nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isActive ? 'bg-white/20 text-blue-300 active' : 'text-gray-300 hover:text-white'
                        }`
                    }
                >
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Codebase
                    </li>
                </NavLink>
                
                <NavLink 
                    to="/history" 
                    className={({ isActive }) => 
                        `nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isActive ? 'bg-white/20 text-blue-300 active' : 'text-gray-300 hover:text-white'
                        }`
                    }
                >
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        History
                    </li>
                </NavLink>
            </ul>
        </nav>
    );
}

export default Navbar;
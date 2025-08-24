const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Search API - Search through codebase files
app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json({ results: [] });
    }

    const results = [];
    const codebaseDir = path.join(__dirname, '../codebase');

    try {
        const files = fs.readdirSync(codebaseDir);
        
        files.forEach(file => {
            if (file.endsWith('.cpp') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html')) {
                const filePath = path.join(codebaseDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(query.toLowerCase())) {
                        const start = Math.max(0, index - 2);
                        const end = Math.min(lines.length, index + 3);
                        const snippet = lines.slice(start, end).join('\n');
                        
                        results.push({
                            file: file,
                            snippet: snippet,
                            line: index + 1
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error reading codebase:', error);
    }

    res.json({ results: results.slice(0, 10) });
});

// Codebase API - Get all files and their content
app.get('/api/codebase', (req, res) => {
    const codebaseDir = path.join(__dirname, '../codebase');
    const files = [];

    try {
        const fileList = fs.readdirSync(codebaseDir);
        
        fileList.forEach(file => {
            if (file.endsWith('.cpp') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html')) {
                const filePath = path.join(codebaseDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                files.push({
                    file: file,
                    content: content
                });
            }
        });
        
        console.log(`Processed ${files.length} files from codebase`);
    } catch (error) {
        console.error('Error reading codebase:', error);
    }

    res.json(files);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'CodeSearchEngine Backend Running'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

# CodeSearchEngine

A modern, fast, and intuitive code search engine built with React and Node.js. Search through your codebase with lightning-fast precision and explore files with a beautiful, responsive interface.

## ✨ Features

### 🔍 **Search Functionality**
- **Instant Search**: Real-time search through your entire codebase
- **Smart Highlighting**: Query terms are highlighted in search results
- **Context-Aware Results**: Shows surrounding code lines for better context
- **Multiple File Types**: Supports `.cpp`, `.js`, `.jsx`, `.html`, and more

### 📁 **Codebase Explorer**
- **File Browser**: Browse all files in your codebase
- **Code Preview**: Expand/collapse files to view their contents
- **File Statistics**: View file counts, character counts, and file types
- **Responsive Design**: Works perfectly on all device sizes

### 📚 **Search History**
- **Persistent Storage**: All searches are saved locally
- **Smart Filtering**: Search through your search history
- **Result Preview**: Quick preview of previous search results
- **Easy Management**: Clear individual entries or entire history

### 🎨 **Modern UI/UX**
- **Glass Morphism**: Beautiful backdrop blur effects
- **Gradient Design**: Modern gradient backgrounds and buttons
- **Smooth Animations**: Elegant fade-in and slide-in animations
- **Dark Theme**: Easy on the eyes with a professional dark theme
- **Responsive Layout**: Optimized for desktop, tablet, and mobile

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **File System** - Native Node.js file operations

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone <your-repo-url>
cd CodeSearchEngine
```

### **2. Install Frontend Dependencies**
```bash
npm install
```

### **3. Install Backend Dependencies**
```bash
cd backend
npm install
cd ..
```

### **4. Configure Environment**
Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
```

### **5. Start the Application**

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

### **6. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
CodeSearchEngine/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   │   ├── About.jsx     # About page component
│   │   ├── Codebase.jsx  # Codebase explorer
│   │   ├── Footer.jsx    # Footer component
│   │   ├── History.jsx   # Search history
│   │   ├── Navbar.jsx    # Navigation bar
│   │   └── Searcher.jsx  # Main search component
│   ├── App.jsx           # Main app component
│   ├── App.css           # App-specific styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── backend/               # Backend server
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── codebase/             # Your code files to search
├── public/               # Static assets
├── package.json          # Frontend dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🔌 API Endpoints

### **Search API**
- `GET /search?q=<query>` - Search through codebase files
- Returns: Array of search results with file, snippet, and line number

### **Codebase API**
- `GET /api/codebase` - Get all files and their content
- Returns: Array of files with name and content

### **Health Check**
- `GET /api/health` - Server health status
- Returns: Server status and timestamp

## 🎯 Usage

### **1. Search Your Code**
- Navigate to the home page
- Enter your search query in the search bar
- Press Enter or click Search
- View highlighted results with context

### **2. Explore Codebase**
- Click on "Codebase" in the navigation
- Browse all files in your codebase
- Click on any file to expand and view its contents
- Use the file type icons for quick identification

### **3. View Search History**
- Click on "History" in the navigation
- View all your previous searches
- Filter history by search terms
- Clear individual entries or entire history

## 🎨 Customization

### **Adding New File Types**
Edit `backend/server.js` to add support for new file extensions:
```javascript
if (file.endsWith('.cpp') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.py')) {
    // Process file
}
```

### **Styling Changes**
- Modify `src/index.css` for global styles
- Update Tailwind classes in components
- Customize color schemes in `tailwind.config.js`

## 🚀 Deployment

### **Frontend Build**
```bash
npm run build
```
The built files will be in the `dist/` directory.

### **Backend Deployment**
- Set `NODE_ENV=production` in your environment
- Use a process manager like PM2
- Configure your reverse proxy (nginx, Apache)

### **Environment Variables**
```env
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS approach
- **Vite** for the lightning-fast build tool
- **Express.js** for the robust backend framework

---

**Built with ❤️ for developers who love clean, fast, and beautiful code search experiences.**

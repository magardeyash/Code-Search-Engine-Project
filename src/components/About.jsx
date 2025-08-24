import React from 'react'

const About = () => {
  const features = [
    {
      icon: "🔍",
      title: "Lightning Fast Search",
      description: "Search through your entire codebase with instant results using advanced indexing algorithms."
    },
    {
      icon: "📁",
      title: "Multi-Language Support",
      description: "Supports various programming languages including C++, JavaScript, Python, and more."
    },
    {
      icon: "🎯",
      title: "Precise Results",
      description: "Get exact matches with highlighted keywords and context-aware search results."
    },
    {
      icon: "📊",
      title: "Search History",
      description: "Keep track of your previous searches with detailed result history and timestamps."
    },
    {
      icon: "⚡",
      title: "Real-time Indexing",
      description: "Automatically indexes your codebase for faster and more accurate search results."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your code stays on your local machine. No data is sent to external servers."
    }
  ];

  const techStack = [
    { name: "React", color: "from-blue-500 to-blue-600" },
    { name: "Express.js", color: "from-green-500 to-green-600" },
    { name: "C++", color: "from-purple-500 to-purple-600" },
    { name: "Tailwind CSS", color: "from-cyan-500 to-cyan-600" },
    { name: "Node.js", color: "from-emerald-500 to-emerald-600" }
  ];

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-6xl mx-auto fade-in">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-6">
            About CodeSearchEngine
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            A powerful, lightning-fast code search engine built for developers who need to quickly find and navigate through their codebase. 
            Built with modern web technologies and optimized for performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="gradient-card p-6 rounded-2xl slide-in hover:transform hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r ${tech.color} text-white px-6 py-3 rounded-xl font-semibold shadow-lg slide-in`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="gradient-card p-8 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  React.js for dynamic user interface
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Tailwind CSS for modern styling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  React Router for navigation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Responsive design for all devices
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-300 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Express.js server for API endpoints
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  C++ indexing engine for performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  File system integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Real-time search processing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
          <p className="text-gray-300 mb-6">Try searching your codebase now and experience the power of fast, accurate code search.</p>
          <button className="gradient-button text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            Start Searching
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
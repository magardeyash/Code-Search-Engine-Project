import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar'
import Searcher from './components/Searcher'
import Footer from './components/Footer'
import About from './components/About'
import Codebase from './components/Codebase'
import History from './components/History'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Navbar /><Searcher /><Footer /></>
        },
        {
            path: "/about",
            element: <><Navbar /><About /><Footer /></>
        },
        {
            path: "/codebase",
            element: <><Navbar /><Codebase /><Footer /></>
        },
        {
            path: "/history",
            element: <><Navbar /><History /><Footer /></>
        }
    ])

    return <RouterProvider router={router} />;
}

export default App

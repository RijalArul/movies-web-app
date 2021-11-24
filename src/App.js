import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import DetailMovie from './pages/DetailMovie'
import Bookmark from './pages/Bookmark'
import PopularMovie from './pages/PopularMovie'
import TopRatedMovie from './pages/TopRatedMovie'

function App () {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/movie/:id/detail-movie', element: <DetailMovie /> },
    { path: '/bookmark', element: <Bookmark /> },
    { path: '/popular-movie', element: <PopularMovie /> },
    { path: '/top-rated-movie', element: <TopRatedMovie /> }
  ])

  return routes
}

const AppWrapper = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <App />
      </Router>
    </div>
  )
}

export default AppWrapper

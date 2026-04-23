import { Routes, Route, NavLink } from 'react-router-dom'
import Songs from './pages/Songs'
import Artists from './pages/Artists'
import Genres from './pages/Genres'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <header className="container">
        <nav>
          <ul>
            <li><strong>Recommended Tunes</strong></li>
          </ul>
          <ul>
            <li><NavLink to="/">Songs</NavLink></li>
            <li><NavLink to="/artists">Artists</NavLink></li>
            <li><NavLink to="/genres">Genres</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Songs />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App

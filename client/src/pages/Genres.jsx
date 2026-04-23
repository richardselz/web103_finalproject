import { useState, useEffect } from 'react'
import GenreCard from '../components/GenreCard'

function Genres() {
  const [genres, setGenres] = useState([])
  const [form, setForm] = useState({ name: '' })
  const [error, setError] = useState(null)

  const fetchGenres = async () => {
    const res = await fetch('/api/genres')
    const data = await res.json()
    setGenres(data)
  }

  useEffect(() => { fetchGenres() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/genres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setForm({ name: '' })
    fetchGenres()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/genres/${id}`, { method: 'DELETE' })
    fetchGenres()
  }

  return (
    <>
      <h2>Genres</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <input
            placeholder="Genre name"
            value={form.name}
            onChange={e => setForm({ name: e.target.value })}
          />
          <button type="submit">Add Genre</button>
        </div>
        {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
      </form>

      <div className="grid">
        {genres.map(genre => (
          <GenreCard key={genre.id} genre={genre} onDelete={handleDelete} />
        ))}
      </div>
    </>
  )
}

export default Genres

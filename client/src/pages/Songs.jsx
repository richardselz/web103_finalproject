import { useState, useEffect } from 'react'
import SongCard from '../components/SongCard'

function Songs() {
  const [songs, setSongs] = useState([])
  const [form, setForm] = useState({ title: '', artist_name: '', year: '' })
  const [error, setError] = useState(null)

  const fetchSongs = async () => {
    const res = await fetch('/api/songs')
    const data = await res.json()
    setSongs(data)
  }

  useEffect(() => { fetchSongs() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setForm({ title: '', artist_name: '', year: '' })
    fetchSongs()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/songs/${id}`, { method: 'DELETE' })
    fetchSongs()
  }

  return (
    <>
      <h2>Songs</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <input
            placeholder="Song title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Artist name"
            value={form.artist_name}
            onChange={e => setForm({ ...form, artist_name: e.target.value })}
          />
          <input
            placeholder="Year"
            type="number"
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          />
        </div>
        {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
        <button type="submit">Add Song</button>
      </form>

      <div className="grid">
        {songs.map(song => (
          <SongCard key={song.id} song={song} onDelete={handleDelete} />
        ))}
      </div>
    </>
  )
}

export default Songs

import { useState, useEffect } from 'react'
import ArtistCard from '../components/ArtistCard'

function Artists() {
  const [artists, setArtists] = useState([])
  const [form, setForm] = useState({ name: '' })
  const [error, setError] = useState(null)

  const fetchArtists = async () => {
    const res = await fetch('/api/artists')
    const data = await res.json()
    setArtists(data)
  }

  useEffect(() => { fetchArtists() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setForm({ name: '' })
    fetchArtists()
  }

  const handleEdit = async (id, name) => {
    const res = await fetch(`/api/artists/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    if (res.ok) fetchArtists()
  }

  return (
    <>
      <h2>Artists</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <input
            placeholder="Artist name"
            value={form.name}
            onChange={e => setForm({ name: e.target.value })}
          />
          <button type="submit">Add Artist</button>
        </div>
        {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
      </form>

      <div className="grid">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} onEdit={handleEdit} />
        ))}
      </div>
    </>
  )
}

export default Artists

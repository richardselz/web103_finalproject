import { useState } from 'react'

function ArtistCard({ artist, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(artist.name)

  const handleSave = () => {
    onEdit(artist.id, name)
    setEditing(false)
  }

  return (
    <article>
      {editing ? (
        <>
          <input value={name} onChange={e => setName(e.target.value)} />
          <footer style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSave}>Save</button>
            <button className="secondary" onClick={() => { setName(artist.name); setEditing(false) }}>Cancel</button>
          </footer>
        </>
      ) : (
        <>
          <header>{artist.name}</header>
          <footer>
            <button className="outline" onClick={() => setEditing(true)}>Edit</button>
          </footer>
        </>
      )}
    </article>
  )
}

export default ArtistCard

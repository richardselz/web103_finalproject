function SongCard({ song, onDelete }) {
  return (
    <article style={{
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: '1 / 1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 0,
      borderRadius: '12px',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: song.image_url ? `url(${song.image_url})` : 'none',
        backgroundColor: song.image_url ? 'transparent' : 'var(--pico-muted-border-color)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(4px) brightness(0.45)',
        transform: 'scale(1.05)',
      }} />

      <div style={{
        position: 'relative',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <div>
          <strong style={{ color: '#fff', fontSize: '1rem' }}>{song.title}</strong>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>
            {song.artist_name}{song.year ? ` · ${song.year}` : ''}
          </p>
        </div>
        <button className="secondary outline" onClick={() => onDelete(song.id)} style={{ margin: 0 }}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default SongCard

import { pool } from '../config/database.js'

async function fetchArtwork(title, artistName) {
  try {
    const query = encodeURIComponent(`${title} ${artistName}`)
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=1`)
    const data = await res.json()
    const art = data.results?.[0]?.artworkUrl100
    return art ? art.replace('100x100bb', '500x500bb') : null
  } catch {
    return null
  }
}

export const getSongs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT songs.*, artists.name AS artist_name
      FROM songs
      JOIN artists ON songs.artist_id = artists.id
      ORDER BY songs.created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getSong = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT songs.*, artists.name AS artist_name
      FROM songs
      JOIN artists ON songs.artist_id = artists.id
      WHERE songs.id = $1
    `, [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Song not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createSong = async (req, res) => {
  try {
    const { title, artist_name, year } = req.body
    if (!title || !artist_name) return res.status(400).json({ error: 'Title and artist name are required' })

    let artistResult = await pool.query('SELECT * FROM artists WHERE LOWER(name) = LOWER($1)', [artist_name])
    if (!artistResult.rows.length) {
      artistResult = await pool.query('INSERT INTO artists (name) VALUES ($1) RETURNING *', [artist_name])
    }
    const artist = artistResult.rows[0]

    const image_url = await fetchArtwork(title, artist.name)

    const result = await pool.query(
      'INSERT INTO songs (title, artist_id, year, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, artist.id, year || null, image_url]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM songs WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Song not found' })
    res.json({ message: 'Song deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const fetchAllArtwork = async (req, res) => {
  try {
    const songs = await pool.query(`
      SELECT songs.id, songs.title, artists.name AS artist_name
      FROM songs
      JOIN artists ON songs.artist_id = artists.id
      WHERE songs.image_url IS NULL
    `)

    let updated = 0
    for (const song of songs.rows) {
      const image_url = await fetchArtwork(song.title, song.artist_name)
      if (image_url) {
        await pool.query('UPDATE songs SET image_url = $1 WHERE id = $2', [image_url, song.id])
        updated++
      }
    }

    res.json({ message: `Updated artwork for ${updated} songs` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

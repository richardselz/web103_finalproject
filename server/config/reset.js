import { pool } from '../config/database.js'
import './dotenv.js'

const createTables = `
  DROP TABLE IF EXISTS song_genres;
  DROP TABLE IF EXISTS songs;
  DROP TABLE IF EXISTS genres;
  DROP TABLE IF EXISTS artists;

  CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    year INTEGER,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
  );

  CREATE TABLE song_genres (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    UNIQUE(song_id, genre_id)
  );
`

const seedData = `
  INSERT INTO artists (name) VALUES
    ('The Beatles'),
    ('Kendrick Lamar'),
    ('Fleetwood Mac');

  INSERT INTO songs (title, artist_id, year) VALUES
    ('Hey Jude', 1, 1968),
    ('Let It Be', 1, 1970),
    ('HUMBLE.', 2, 2017),
    ('DNA.', 2, 2017),
    ('Go Your Own Way', 3, 1977);

  INSERT INTO genres (name) VALUES
    ('Rock'),
    ('Hip-Hop'),
    ('Classic Rock'),
    ('Pop');

  INSERT INTO song_genres (song_id, genre_id) VALUES
    (1, 1), (1, 4),
    (2, 1), (2, 4),
    (3, 2),
    (4, 2),
    (5, 1), (5, 3);
`

async function reset() {
  try {
    await pool.query(createTables)
    console.log('Tables created')
    await pool.query(seedData)
    console.log('Seed data inserted')
  } catch (err) {
    console.error('Reset failed:', err)
  } finally {
    await pool.end()
  }
}

reset()

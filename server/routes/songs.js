import express from 'express'
import { getSongs, getSong, createSong, deleteSong, fetchAllArtwork } from '../controllers/songs.js'

const router = express.Router()

router.get('/', getSongs)
router.post('/', createSong)
router.post('/fetch-artwork', fetchAllArtwork)
router.get('/:id', getSong)
router.delete('/:id', deleteSong)

export default router

function GenreCard({ genre, onDelete }) {
  return (
    <article>
      <header>{genre.name}</header>
      <footer>
        <button className="secondary" onClick={() => onDelete(genre.id)}>Delete</button>
      </footer>
    </article>
  )
}

export default GenreCard

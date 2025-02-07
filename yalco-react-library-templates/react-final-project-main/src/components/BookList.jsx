import { Link } from 'react-router-dom'
import { useBookContext } from '../context/BookContext'
import Loading from './Loading'
import Error from './Error'
import { renderStars, getBookEmoji } from '../utils'
import styles from './BookList.module.css'

const BookList = () => {
  const { books, dispatch, loading, error } = useBookContext()

  if (loading) return <Loading />
  if (error) return <Error /> 

  const toggleAvailable = async (id, currentAvailable) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !currentAvailable })
      })
  
      if (!response.ok) throw new Error('Failed to update availability')
  
      const updatedBook = await response.json()
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook })
    } catch (err) {
      console.error(err.message)
    }
  } 

  return (
    <section className={styles.list}>
      {books.map((book) => (
        <article key={book.id} className={styles.item}>
          <div>
            {getBookEmoji(book.id)}
          </div>
          <div>
            <h3>{book.title}</h3>
            <p>{book.author} / {book.genre}</p>
            <p className={styles.rating}>
              {renderStars(book.rating)}
            </p>
          </div>
          <div>
            <button
              className={
                styles.toggleButton
                + (book.available ? '' : ` ${styles.off}`)
              }
              onClick={() => toggleAvailable(book.id, book.available)}
            >
              {book.available ? 'Available' : 'Unavailable'}
            </button>
            <Link className={styles.link} to={`/books/${book.id}`}>Details</Link>
          </div>
        </article>
      ))}
    </section>
  )
}

export default BookList

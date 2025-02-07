import { useBookContext } from '../context/BookContext'
import styles from './Home.module.css'
import BookList from '../components/BookList'
import { genres } from '../utils'

const Home = () => {
  const { setGenre, setSearch } = useBookContext()

  return (
    <div>
      <header className={styles.topbar}>
        <h1>Book List</h1>
        <div>
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </header>
      <BookList />
    </div>
  )
}

export default Home

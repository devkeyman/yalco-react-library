import { useBookContext } from "../context/BookContext";
import { genres } from "../utils";
import styles from "./Home.module.css";
import BookList from "../components/BookList";

const Home = () => {
  const { setGenre, setSearch } = useBookContext();

  return (
    <div>
      <header className={styles.topbar}>
        <h1>도서 목록</h1>
        <div>
          <input
            type="text"
            placeholder="제목 또는 작가를 검색하세요."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setGenre(e.target.value)}>
            <option value="">모든 장르</option>
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
  );
};

export default Home;

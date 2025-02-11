import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import styles from "./BookDetail.module.css";
import { getBookEmoji, renderStars } from "../utils";

const BookDetail = ({ id }) => {
  const navigate = useNavigate();
  const { dispatch } = useBookContext();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
      }
    };
    fetchBook();
  }, [id]);
  if (!book) return <Loading />;

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete book");
      dispatch({ type: "DELETE_BOOK", payload: id });
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section className={styles.detail}>
        <div>
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
          <p>
            <strong>Rating:</strong>
            <span className={styles.rating}>{renderStars(book.rating)}</span>
          </p>
          <p>
            <strong>Available:</strong> {book.available ? "Yes" : "No"}
          </p>
        </div>
        <div>{getBookEmoji(book.id)}</div>
      </section>
      <section className={styles.buttons}>
        <button onClick={handleEdit} className={styles.editButton}>
          수정
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          삭제
        </button>
      </section>
    </>
  );
};

export default BookDetail;

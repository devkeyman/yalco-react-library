import { Navigate, useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { useRef } from "react";
import styles from "./bookForm.module.css";
import { genres } from "../utils";

const BookForm = ({ initialData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const titleRef = useRef();
  const authorRef = useRef();
  const genreRef = useRef();
  const dateRef = useRef();
  const availableRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      id: initialData.id || null,
      title: titleRef.current.value,
      author: authorRef.current.value,
      genre: genreRef.current.value,
      publishedDate: dateRef.current.value,
      available: availableRef.current.checked,
    };

    onSubmit(bookData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        ref={titleRef}
        defaultValue={initialData.title || ""}
        placeholder="Title"
        required
      />
      <input
        type="text"
        ref={authorRef}
        defaultValue={initialData.author || ""}
        placeholder="Author"
        required
      />
      <select ref={genreRef} defaultValue={initialData.genre || ""} required>
        <option value="" disabled>
          Select Genre
        </option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <input
        type="date"
        ref={dateRef}
        defaultValue={initialData.publishedDate || ""}
        placeholder="Published Date"
        required
      />
      <input
        type="number"
        defaultValue={initialData.rating || 1}
        placeholder="Rating (1-5)"
        required
        min={1}
        max={5}
      />
      <label htmlFor="">
        <input
          type="checkbox"
          ref={availableRef}
          defaultChecked={initialData.available || false}
        />
        Available
      </label>
      <div className={styles.buttons}>
        <button type="submit">
          {initialData.id ? "Update Book" : "Add Book"}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;

import BookDetail from "../components/BookDetail";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>도서 상세정보</h1>
      <BookDetail id={id} />
    </div>
  );
};

export default BookDetails;

import BookDetail from '../components/BookDetail'
import { useParams } from 'react-router-dom'

const BookDetails = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Book Details</h1>
      <BookDetail id={id} />
    </div>
  )
}

export default BookDetails

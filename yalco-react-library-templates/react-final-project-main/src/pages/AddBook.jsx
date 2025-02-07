import { useNavigate } from 'react-router-dom'
import { useBookContext } from '../context/BookContext'
import BookForm from '../components/BookForm'

const AddBook = () => {
  const navigate = useNavigate()
  const { dispatch } = useBookContext()

  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      })

      if (!response.ok) throw new Error('Failed to add book')

      const data = await response.json()
      dispatch({ type: 'ADD_BOOK', payload: data })
      navigate('/')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div>
      <h1>Add New Book</h1>
      <BookForm onSubmit={handleAddBook} />
    </div>
  )
}

export default AddBook

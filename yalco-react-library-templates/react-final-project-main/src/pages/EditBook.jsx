import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBookContext } from '../context/BookContext'
import Loading from '../components/Loading'
import BookForm from '../components/BookForm'

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useBookContext()
  const [bookData, setBookData] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`)
      if (response.ok) {
        const data = await response.json()
        setBookData(data)
      }
    }
    fetchBook()
  }, [id])

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      })

      if (!response.ok) throw new Error('Failed to update book')

      const data = await response.json()
      dispatch({ type: 'UPDATE_BOOK', payload: data })
      navigate('/')
    } catch (err) {
      console.error(err.message)
    }
  }

  if (!bookData) return <Loading />

  return (
    <div>
      <h1>Edit Book</h1>
      <BookForm initialData={bookData} onSubmit={handleUpdateBook} />
    </div>
  )
}

export default EditBook

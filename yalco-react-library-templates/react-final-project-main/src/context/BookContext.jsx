import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { bookReducer } from './BookReducer'
import { useFetch } from '../hooks/useFetch'

const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, { books: [] })
  const [filterParams, setFilterParams] = useState({ genre: '', search: '' })
  const queryString = new URLSearchParams(filterParams).toString()
  const { data, loading, error } = useFetch(`/books?${queryString}`)

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_BOOKS', payload: data })
    }
  }, [data])

  const setGenre = (genre) => {
    setFilterParams(prev => ({ ...prev, genre }))
  }

  const setSearch = (search) => {
    setFilterParams(prev => ({ ...prev, search }))
  }

  return (
    <BookContext.Provider value={{ books: state.books, dispatch, loading, error, setGenre, setSearch }}>
      {children}
    </BookContext.Provider>
  )
}

export const useBookContext = () => useContext(BookContext)

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

app.use(cors())
app.use(express.json())

let books = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', publishedDate: '1925-04-10', rating: 5, available: true },
  { id: '2', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'Non-fiction', publishedDate: '2011-01-01', rating: 4, available: true },
  { id: '3', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', publishedDate: '1997-06-26', rating: 3, available: false },
  { id: '4', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', publishedDate: '1960-07-11', rating: 5, available: true },
  { id: '5', title: '1984', author: 'George Orwell', genre: 'Dystopian', publishedDate: '1949-06-08', rating: 5, available: false },
  { id: '6', title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', publishedDate: '1951-07-16', rating: 4, available: true },
  { id: '7', title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', publishedDate: '1932-01-01', rating: 3, available: true },
  { id: '8', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publishedDate: '1937-09-21', rating: 5, available: false },
  { id: '9', title: 'Meditations', author: 'Marcus Aurelius', genre: 'Philosophy', publishedDate: '180-01-01', rating: 4, available: true },
  { id: '10', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publishedDate: '1813-01-28', rating: 5, available: true }
]


app.get('/books', (req, res) => {
  const { genre, search } = req.query
  let result = books

  if (genre) {
    result = result.filter(book => book.genre.toLowerCase() === genre.toLowerCase())
  }

  if (search) {
    const searchLower = search.toLowerCase()
    result = result.filter(book =>
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    )
  }

  setTimeout(() => res.json(result), 500)
})

app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id)
  if (!book) {
    return setTimeout(() => res.status(404).json({ error: 'Book not found' }), 500)
  }
  setTimeout(() => res.json(book), 500)
})

app.post('/books', (req, res) => {
  const { title, author, genre, publishedDate, rating, available } = req.body
  const id = String(books.length + 1)
  const newBook = { id, title, author, genre, publishedDate, rating, available }
  books.push(newBook)
  setTimeout(() => res.status(201).json(newBook), 500)
})

app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === req.params.id)
  if (bookIndex === -1) {
    return setTimeout(() => res.status(404).json({ error: 'Book not found' }), 500)
  }

  const { title, author, genre, publishedDate, rating, available } = req.body
  books[bookIndex] = { ...books[bookIndex], title, author, genre, publishedDate, rating, available }
  setTimeout(() => res.json(books[bookIndex]), 500)
})

app.patch('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === req.params.id)
  if (bookIndex === -1) {
    return setTimeout(() => res.status(404).json({ error: 'Book not found' }), 200)
  }

  const updates = req.body
  books[bookIndex] = { ...books[bookIndex], ...updates }
  setTimeout(() => res.json(books[bookIndex]), 200)
})

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === req.params.id)
  if (bookIndex === -1) {
    return setTimeout(() => res.status(404).json({ error: 'Book not found' }), 500)
  }
  books.splice(bookIndex, 1)
  setTimeout(() => res.status(204).send(), 500)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

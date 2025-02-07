import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import BookDetails from './pages/BookDetails'
import Error from './components/Error'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  )
}

export default App

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BookProvider>
      <App />
    </BookProvider>
  </BrowserRouter>
)

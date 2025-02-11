import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import Layout from "./components/Layout";
import Error from "./components/Error";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;

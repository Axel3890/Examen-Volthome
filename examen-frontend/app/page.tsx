"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BookCard } from "./components/books-cards"
import { BookForm } from "./components/book-forms"
import { AuthorSearch } from "./components/author-search"
import { DecadeView } from "./components/decade-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GroupedDecadeSection } from "./components/group-decade-section"
import type { Book } from "./types"

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/books`)
      setBooks(res.data)
      setErrorMessage(null)
    } catch (err: any) {
      console.error("Error al obtener libros:", err)
      const msg = err.response?.data?.message
      setErrorMessage(Array.isArray(msg) ? msg.join("; ") : msg || "Error al obtener libros")
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    try {
      await axios.post(`http://localhost:3000/books`, {
        title: newBook.title,
        published_year: newBook.published_year,
        author_id: newBook.author_id,
      })
      setIsAddingBook(false)
      setErrorMessage(null)
      fetchBooks()
    } catch (err: any) {
      console.error("Error al agregar libro:", err)
      const msg = err.response?.data?.message
      setErrorMessage(Array.isArray(msg) ? msg.join("; ") : msg || "Error al agregar libro")
    }
  }

  const handleEditBook = async (updatedBook: Book) => {
    try {
      await axios.put(`http://localhost:3000/books/${updatedBook.id}`, {
        title: updatedBook.title,
        published_year: updatedBook.published_year,
        author_id: updatedBook.author_id,
      })
      setEditingBook(null)
      setErrorMessage(null)
      fetchBooks()
    } catch (err: any) {
      console.error("Error al editar libro:", err)
      const msg = err.response?.data?.message
      setErrorMessage(Array.isArray(msg) ? msg.join("; ") : msg || "Error al editar libro")
    }
  }

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`)
      setErrorMessage(null)
      fetchBooks()
    } catch (err: any) {
      console.error("Error al eliminar libro:", err)
      const msg = err.response?.data?.message
      setErrorMessage(Array.isArray(msg) ? msg.join("; ") : msg || "Error al eliminar libro")
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Examen Volthome</h1>
          <p className="text-slate-600">Sistema para una libreria.</p>
        </header>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="books">Coleccion</TabsTrigger>
            <TabsTrigger value="authors">Buscar Autores</TabsTrigger>
            <TabsTrigger value="decades">Libros por decadas</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-700">Coleccion de libros</h2>
              <Button onClick={() => setIsAddingBook(true)} className="bg-teal-600 hover:bg-teal-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir libro
              </Button>
            </div>

            {isAddingBook && (
              <BookForm
                onSubmit={handleAddBook}
                onCancel={() => setIsAddingBook(false)}
              />
            )}

            {editingBook && (
              <BookForm
                book={editingBook}
                onSubmit={handleEditBook}
                onCancel={() => setEditingBook(null)}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id!}
                  book={book}
                  onEdit={() => setEditingBook(book)}
                  onDelete={() => handleDeleteBook(book.id!)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authors">
            <AuthorSearch />
          </TabsContent>

          <TabsContent value="decades">
            <GroupedDecadeSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

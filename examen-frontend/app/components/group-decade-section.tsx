"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { DecadeView } from "./decade-view"

interface Book {
  id: number
  title: string
  published_year: number
  author_id: string
}

export function GroupedDecadeSection() {
  const [groupedBooks, setGroupedBooks] = useState<Record<string, Book[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGroupedBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/grouped`)
        setGroupedBooks(res.data)
      } catch (err) {
        console.error("Error fetching grouped books:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupedBooks()
  }, [])

  if (loading) {
    return <p className="text-center text-slate-600 py-8">Cargando libros...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">Fallo al cargar los libros</p>
  }

  return <DecadeView groupedBooks={groupedBooks} />
}

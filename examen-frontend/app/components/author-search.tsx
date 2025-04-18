"use client"

import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

interface Author {
  id: string
  name: string
  top_work: string
  work_count: number
}

export function AuthorSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      setResults([])
      setErrorMessage(null)
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await axios.get(`http://localhost:3000/authors`, {
        params: { search: query },
      })

      setResults(res.data)
    } catch (error: any) {
      console.error("Error fetching authors:", error)
      const msg = error.response?.data?.message
      setErrorMessage(Array.isArray(msg) ? msg.join("; ") : msg || "Error al buscar autores")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Búsqueda de autores</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca un autor..."
            className="max-w-md"
          />
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </form>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded">
          {errorMessage}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-700">Resultados de la búsqueda</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((author) => (
              <Card key={author.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-800">{author.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-slate-600">ID del autor:</span>
                      <p className="text-sm text-slate-800">{author.id || "Desconocido"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Trabajo más conocido:</span>
                      <p className="text-sm text-slate-800">{author.top_work || "Desconocido"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Número total de trabajos:</span>
                      <p className="text-sm text-slate-800">{author.work_count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && !loading && !errorMessage && (
        <div className="text-center p-8 bg-slate-100 rounded-lg">
          <p className="text-slate-600">No se encontraron autores para: "{query}"</p>
        </div>
      )}
    </div>
  )
}

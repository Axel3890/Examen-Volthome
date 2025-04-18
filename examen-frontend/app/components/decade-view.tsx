"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Book {
  id: number
  title: string
  published_year: number
  author_id: string
}

interface DecadeViewProps {
  groupedBooks: Record<string, Book[]>
}

export function DecadeView({ groupedBooks }: DecadeViewProps) {
  const sortedDecades = Object.keys(groupedBooks).sort((a, b) => {
    return parseInt(b) - parseInt(a)
  })

  const [expandedDecades, setExpandedDecades] = useState<Record<string, boolean>>(
    sortedDecades.reduce((acc, decade) => {
      acc[decade] = true
      return acc
    }, {} as Record<string, boolean>)
  )

  const toggleDecade = (decade: string) => {
    setExpandedDecades((prev) => ({
      ...prev,
      [decade]: !prev[decade],
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-700">📚 Libros por decada</h2>

      {sortedDecades.length === 0 ? (
        <div className="text-center p-8 bg-slate-100 rounded-lg">
          <p className="text-slate-600">No hay libros disponibles para mostrar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDecades.map((decade) => (
            <Card key={decade} className="overflow-hidden">
              <CardHeader className="bg-slate-100 py-3 cursor-pointer" onClick={() => toggleDecade(decade)}>
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                  {expandedDecades[decade] ? (
                    <ChevronDown className="h-5 w-5 mr-2 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 mr-2 text-slate-600" />
                  )}
                  {decade} ({groupedBooks[decade].length} Libros)
                </CardTitle>
              </CardHeader>

              {expandedDecades[decade] && (
                <CardContent className="pt-4">
                  <ScrollArea className="max-h-[300px]">
                    <ul className="space-y-2">
                      {groupedBooks[decade].map((book) => (
                        <li key={book.id} className="p-2 hover:bg-slate-50 rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium text-slate-800">{book.title}</span>
                            <span className="text-slate-600">{book.published_year}</span>
                          </div>
                          <div className="text-sm text-slate-600">by {book.author_id}</div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Book } from "../types"


interface BookFormProps {
  book?: Book
  onSubmit: (book: Book) => void | Promise<void>
  onCancel: () => void
}



export function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Book>({
    id: book?.id,
    title: book?.title || "",
    published_year: book?.published_year || new Date().getFullYear(),
    author_id: book?.author_id || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "published_year" ? Number.parseInt(value) || new Date().getFullYear() : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="mb-6 border-teal-100 bg-teal-50/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800">
          {book ? "Edit Book" : "Add New Book"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author_id">ID del Autor</Label>
            <Input
              id="author_id"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              required
              className="bg-white"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="published_year">Año</Label>
            <Input
              id="published_year"
              name="published_year"
              type="number"
              value={formData.published_year}
              onChange={handleChange}
              required
              min="1"
              max={new Date().getFullYear()}
              className="bg-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            {book ? "Actualizar" : "Añadir"} Libro
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

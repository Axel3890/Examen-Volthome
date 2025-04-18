"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { Book } from "../types"

interface BookCardProps {
  book: Book
  onEdit: () => void
  onDelete: () => void
}


export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="bg-slate-100 pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 line-clamp-1">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-600">Autor:</span>
            <span className="text-sm text-slate-800">{book.author_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-600">Año:</span>
            <span className="text-sm text-slate-800">{book.published_year}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

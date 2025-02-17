"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Article {
  id: number
  title: string
  content: string
  category: string
}

export default function PreviewArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 5

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article/?limit=${articlesPerPage}&offset=${(currentPage - 1) * articlesPerPage}`,
      )
      const data = await response.json()
      setArticles(data.data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    }
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
          <p className="text-sm text-gray-500 mb-2">Category: {article.category}</p>
          <p>{article.content}</p>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={articles.length < articlesPerPage}>
          Next
        </Button>
      </div>
    </div>
  )
}


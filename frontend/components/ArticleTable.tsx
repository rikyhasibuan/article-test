"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface Article {
  id: number
  title: string
  category: string
  content: string
  status: "publish" | "draft" | "trash"
}

export default function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeTab, setActiveTab] = useState("published")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`)
      const result = await response.json()

      console.log("Fetched data:", result)

      if (Array.isArray(result.data)) {
        setArticles(result.data)
      } else {
        console.error("Unexpected API response:", result)
        setArticles([])
      }
    } catch (error) {
      console.error("Error fetching articles:", error)
      setArticles([])
    }
  }

  const handleTrash = async (id: number) => {
    try {
      const selectedArticle = articles.find(post => post.id ===id);
      if (!selectedArticle) {
        console.error("Article not found:", id);
        return;
      }
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: selectedArticle.title,
          category: selectedArticle.category,
          content: selectedArticle.content,
          status: "trash",
        }),
      })
      fetchArticles()
    } catch (error) {
      console.error("Error trashing article:", error)
    }
  }

  const filteredArticles = articles.filter((article) => {
    if (activeTab === "published") return article.status === "publish"
    if (activeTab === "drafts") return article.status === "draft"
    if (activeTab === "trashed") return article.status === "trash"
    return false
  })

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="trashed">Trashed</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <Link href={`/edit/${article.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleTrash(article.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}


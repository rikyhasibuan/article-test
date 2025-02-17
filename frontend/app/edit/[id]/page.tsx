"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    fetchArticle()
  }, [])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${params.id}`)
      const data = await response.json()
      setTitle(data.data.title)
      setContent(data.data.content)
      setCategory(data.data.category)
    } catch (error) {
      console.error("Error fetching article:", error)
    }
  }

  const handleSubmit = async (status: "publish" | "draft") => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, status }),
      })
      if (response.ok) {
        alert("Article updated successfully!")
        router.push("/")
      } else {
        throw new Error("Failed to update article")
      }
    } catch (error) {
      console.error("Error updating article:", error)
      alert("Failed to update article")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Article</h1>
      <div className="space-y-4">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Button onClick={() => handleSubmit("publish")}>Publish</Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")}>
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  )
}


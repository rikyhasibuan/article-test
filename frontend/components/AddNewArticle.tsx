"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddNewArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = async (status: "publish" | "draft") => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, status }),
      })
      if (response.ok) {
        setTitle("")
        setContent("")
        setCategory("")
        alert("Article saved successfully!")
      } else {
        throw new Error("Failed to save article")
      }
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Failed to save article")
    }
  }

  return (
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
  )
}


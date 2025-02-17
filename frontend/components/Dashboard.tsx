"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArticleTable from "./ArticleTable"
import AddNewArticle from "./AddNewArticle"
import PreviewArticles from "./PreviewArticles"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all-posts")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all-posts">All Posts</TabsTrigger>
        <TabsTrigger value="add-new">Add New</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="all-posts">
        <ArticleTable />
      </TabsContent>
      <TabsContent value="add-new">
        <AddNewArticle />
      </TabsContent>
      <TabsContent value="preview">
        <PreviewArticles />
      </TabsContent>
    </Tabs>
  )
}


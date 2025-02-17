package main

import (
	"log"

	"article/config"
	"article/internal/models"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, err := config.SetupDatabase()
	if err != nil {
		log.Fatalf("Error setting up database: %v", err)
	}

	articles := []models.Post{
		{Title: "First Article Title", Content: "This is the content of the first article. It should be at least 200 characters long to pass validation.", Category: "Technology", Status: "publish"},
		{Title: "Second Article Title", Content: "This is the content of the second article. It should also be at least 200 characters long to pass validation.", Category: "Science", Status: "draft"},
	}

	for _, article := range articles {
		if err := db.Create(&article).Error; err != nil {
			log.Printf("Error seeding article: %v", err)
		}
	}

	log.Println("Seeding completed successfully")
}

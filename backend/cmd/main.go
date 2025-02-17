package main

import (
	"fmt"
	"log"
	"os"

	"article/config"
	"article/internal/routes"

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

	r := routes.SetupRouter(db)

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(fmt.Sprintf(":%s", port))
}

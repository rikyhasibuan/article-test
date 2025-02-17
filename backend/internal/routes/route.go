package routes

import (
	"article/internal/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Adjust for production
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	postController := controllers.NewArticleController(db)

	r.GET("/article/", postController.GetArticles)
	r.GET("/article/:id", postController.GetArticle)
	r.POST("/article", postController.CreateArticle)
	r.PUT("/article/:id", postController.UpdateArticle)
	r.DELETE("/article/:id", postController.DeleteArticle)

	return r
}

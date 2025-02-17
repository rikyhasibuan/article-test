package controllers

import (
	"net/http"
	"strconv"

	"article/internal/helpers"
	"article/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type ArticleController struct {
	DB       *gorm.DB
	Validate *validator.Validate
}

func NewArticleController(db *gorm.DB) *ArticleController {
	return &ArticleController{
		DB:       db,
		Validate: validator.New(),
	}
}

func (ac *ArticleController) CreateArticle(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid request", err.Error())
		return
	}

	if err := ac.Validate.Struct(post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid offset parameter", nil)
		return
	}

	if err := ac.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		helpers.ErrorResponse(c, http.StatusInternalServerError, "Failed to create article", err.Error())
		return
	}
	helpers.SuccessResponse(c, http.StatusCreated, "Article created successfully", post)
}

func (ac *ArticleController) GetArticles(c *gin.Context) {
	limit, err := strconv.Atoi(c.DefaultQuery("limit", "10")) // Default limit 10
	if err != nil || limit <= 0 {
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid limit parameter", nil)
		return
	}

	offset, err := strconv.Atoi(c.DefaultQuery("offset", "0")) // Default offset 0
	if err != nil || offset < 0 {
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid offset parameter", nil)
		return
	}

	var posts []models.Post
	if err := ac.DB.Limit(limit).Offset(offset).Find(&posts).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch articles", err.Error())
		return
	}

	helpers.SuccessResponse(c, http.StatusOK, "Article fetched successfully", posts)
}

func (ac *ArticleController) GetArticle(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := ac.DB.First(&post, id).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusNotFound, "Article not found", nil)
		return
	}
	helpers.SuccessResponse(c, http.StatusOK, "Article fetched successfully", post)
}

func (ac *ArticleController) UpdateArticle(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := ac.DB.First(&post, id).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusNotFound, "Article not found", nil)
		return
	}

	if err := c.ShouldBindJSON(&post); err != nil {
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid Request", err.Error())
		return
	}

	if err := ac.Validate.Struct(post); err != nil {
		helpers.ErrorResponse(c, http.StatusBadRequest, "Invalid Request", err.Error())
		return
	}

	if err := ac.DB.Save(&post).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helpers.SuccessResponse(c, http.StatusOK, "Article updated successfully", post)
}

func (ac *ArticleController) DeleteArticle(c *gin.Context) {
	id := c.Param("id")
	var post models.Post

	if err := ac.DB.First(&post, id).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusNotFound, "Article not found", nil)
		return
	}

	if err := ac.DB.Delete(&post).Error; err != nil {
		helpers.ErrorResponse(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	helpers.SuccessResponse(c, http.StatusOK, "Article deleted successfully", nil)
}

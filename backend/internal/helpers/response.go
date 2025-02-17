package helpers

import (
	"github.com/gin-gonic/gin"
)

type APIResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
}

func SuccessResponse(c *gin.Context, statusCode int, message string, data interface{}) {
	c.JSON(statusCode, APIResponse{
		Status:  "success",
		Message: message,
		Data:    data,
		Errors:  nil,
	})
}

func ErrorResponse(c *gin.Context, statusCode int, message string, errors interface{}) {
	c.JSON(statusCode, APIResponse{
		Status:  "error",
		Message: message,
		Data:    nil,
		Errors:  errors,
	})
}

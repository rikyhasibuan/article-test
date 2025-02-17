package models

import (
	"time"
)

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"size:255;not null" validate:"required,min=10"`
	Content   string    `json:"content" gorm:"type:text;not null" validate:"required,min=200"`
	Category  string    `json:"category" gorm:"size:100;not null" validate:"required,min=3"`
	Status    string    `json:"status" gorm:"size:20;not null" validate:"required,oneof=publish draft trash"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

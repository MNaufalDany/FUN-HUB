# 🎮 GameScope — Public Game API Explorer

A modern web-based application developed as part of the **Enterprise Application Integration** course. This project demonstrates how to integrate a public API into a web application using a clean architecture (frontend + backend).

---

## 📌 Project Description

GameScope is a web application that allows users to explore video game data retrieved from the **RAWG Public Game API**. The application provides real-time search, filtering, and dynamic rendering of game data.

This project emphasizes:
- API integration
- Client-server communication
- Data fetching and rendering
- Clean UI/UX design for data visualization

---

## 🎯 Learning Objectives

This project is developed to fulfill the requirements of:

> **Enterprise Application Integration Course**

Where students are required to:
- Implement a public API into an application
- Understand API endpoints and parameters
- Handle request and response data
- Build frontend and backend integration

---

## ⚙️ Tech Stack

| Layer       | Technology |
|------------|-----------|
| Frontend   | HTML, Tailwind CSS |
| Styling    | Custom CSS |
| Backend    | Node.js (Express) |
| API        | RAWG Game API |

---

## 🔌 API Integration

### Base Endpoint
https://api.rawg.io/api/games

---

### Local Endpoint (Backend)

GET /api/games


---

### Query Parameters

| Parameter | Description |
|----------|------------|
| search   | Search games by name |
| genre    | Filter by game genre |
| key      | API key (handled in backend) |

---

### Example Request

/api/games?search=elden ring&genre=action


---

### Example Response (Simplified)

```json
{
  "results": [
    {
      "name": "Elden Ring",
      "rating": 4.5,
      "released": "2022-02-25",
      "background_image": "image_url",
      "genres": [
        { "name": "Action" },
        { "name": "RPG" }
      ]
    }
  ]
}

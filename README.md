# Superhero Database

A full-stack web application for managing a superhero database. Create, edit, delete, and view superheroes with their images, superpowers, and more!

## 🦸 Features

- **CRUD Operations**: Create, Read, Update, and Delete superheroes
- **Image Management**: Upload and manage multiple images per superhero
- **Pagination**: Browse superheroes with 5 items per page
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Styled with Tailwind CSS

## 🛠️ Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Multer** for file uploads
- **Sharp** for image processing

### Frontend

- **React 19** with Vite
- **Tailwind CSS 4** for styling
- **Custom hooks** for state management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JustMrArgus/superhero-database.git
cd superhero-database
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/superhero-db
# or your MongoDB Atlas connection string
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Open the Application

Navigate to `http://localhost:5173` in your browser.

## 📁 Project Structure

```
superhero-database/
├── backend/
│   ├── controllers/      # Route handlers
│   ├── db/               # Database connection
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── public/           # Static files (images)
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
│
└── frontend/
    └── src/
        ├── components/   # React components
        ├── hooks/        # Custom React hooks
        ├── services/     # API service layer
        ├── App.jsx       # Main app component
        └── main.jsx      # Entry point
```

## 📝 API Endpoints

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| GET    | /api/superheroes     | Get all superheroes (paginated) |
| GET    | /api/superheroes/:id | Get a single superhero          |
| POST   | /api/superheroes     | Create a new superhero          |
| PATCH  | /api/superheroes/:id | Update a superhero              |
| DELETE | /api/superheroes/:id | Delete a superhero              |

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5)

## 🎨 Superhero Model

```javascript
{
  nickname: String,        // e.g., "Superman"
  real_name: String,       // e.g., "Clark Kent"
  origin_description: String,
  superpowers: [String],   // Array of superpowers
  catch_phrase: String,
  images: [String]         // Array of image filenames
}
```

## 🔧 Assumptions Made

1. **MongoDB**: The application assumes a MongoDB database is available (local or Atlas)
2. **Image Storage**: Images are stored locally in `backend/public/img/heroes/`
3. **Pagination**: Fixed at 5 items per page as per requirements
4. **Single Page Application**: No routing library used - all views are rendered via modals
5. **No Authentication**: The application doesn't require user authentication
6. **Image Format**: All uploaded images are converted to JPEG format and resized to 1920x1080

## 🧪 Development

### Running in Development Mode

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

### Building for Production

Frontend:

```bash
cd frontend
npm run build
```

## 📄 License

ISC License

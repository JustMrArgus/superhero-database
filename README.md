Вот исправленная версия `README.md`.

Я убрал лишние экранирования (обратные слэши перед кавычками), исправил отступы внутри блоков кода, чтобы они выглядели аккуратно, и проверил разметку таблиц. Сами команды остались без изменений.

````markdown
# Superhero Database

A full-stack web application for managing a superhero database.

## Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Multer** for file uploads
- **Sharp** for image processing
- **Jest** for testing

### Frontend

- **React** with Vite
- **Tailwind CSS** for styling
- **Vitest** + React Testing Library for testing

### DevOps

- **Docker** & **Docker Compose**
- **CI/CD with GitHub Actions**
- **Nginx**

## Getting Started

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone [https://github.com/JustMrArgus/superhero-database.git](https://github.com/JustMrArgus/superhero-database.git)
cd superhero-database

# Start all services
docker compose up
```
````

The application will be available at:

- Frontend: http://localhost
- Backend API: http://localhost:3000

To stop the services:

```bash
docker compose down

```

To stop and remove all data:

```bash
docker compose down -v

```

### Option 2: Manual Setup

#### 1. Clone the repository

```bash
git clone [https://github.com/JustMrArgus/superhero-database.git](https://github.com/JustMrArgus/superhero-database.git)
cd superhero-database

```

#### 2. Setup Backend

```bash
cd backend
npm install

```

Create a `.env` file:

```env
PORT=3000
DB=mongodb://localhost:27017/superhero-db

```

Start the backend server:

```bash
npm run dev

```

The backend will run on `http://localhost:3000`

#### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install

```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000

```

Start the frontend:

```bash
npm run dev

```

The frontend will run on `http://localhost:5173`

#### 4. Open the Application

Navigate to `http://localhost:5173` in your browser.

## Testing

### Backend Tests

```bash
cd backend
npm test

```

### Frontend Tests

```bash
cd frontend
npm test               # Watch mode
npm run test:run       # Single run
npm run test:coverage  # With coverage

```

## API Endpoints

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

### Environment Variables

#### Backend

| Variable | Description               | Default     |
| -------- | ------------------------- | ----------- |
| PORT     | Server port               | 3000        |
| DB       | MongoDB connection string | -           |
| NODE_ENV | Environment               | development |

#### Frontend (Build-time)

| Variable     | Description     | Default               |
| ------------ | --------------- | --------------------- |
| VITE_API_URL | Backend API URL | http://localhost:3000 |

```

```

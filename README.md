# Organizer.ai

This repository is a monorepo that contains both the frontend and backend for a simple Todo application. The frontend is built using React with TypeScript, and the backend is built with FastAPI using Pydantic for data validation and SQLite as the database.

---

## Features

### Frontend:

- React with TypeScript
- Component-based architecture
- State management with React Context or a preferred library
- Type-safe API calls
- Styling with CSS modules or a styling library (e.g., Material-UI)

### Backend:

- FastAPI for building APIs
- Pydantic for data validation and serialization
- SQLite as the database for simplicity
- RESTful API design

---

## Project Structure

```
monorepo/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service handlers
│   │   ├── styles/         # Stylesheets
│   │   ├── App.tsx         # Main app entry point
│   │   └── index.tsx       # React DOM entry point
│   └── package.json        # Frontend dependencies and scripts
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── main.py         # Entry point for the FastAPI app
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic models
│   │   ├── crud.py         # CRUD utility functions
│   │   ├── database.py     # Database setup
│   │   └── routers/        # API routes
│   └── requirements.txt    # Backend dependencies
├── .gitignore              # Ignored files
├── README.md               # Project documentation
└── package.json            # Root-level dependencies and scripts (optional)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (for the frontend)
- [Python 3.9+](https://www.python.org/) (for the backend)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/V15H4L-dev/organizer.ai.git
cd organizer.ai
```

### 2. Set up the backend

1. Navigate to the `backend/` directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`.

### 3. Set up the frontend

1. Navigate to the `frontend/` directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---

## API Endpoints

### Base URL:

`http://127.0.0.1:8000`

### Endpoints:

- **GET /todos**: Retrieve all todos
- **POST /todos**: Create a new todo
- **PUT /todos/{id}**: Update a specific todo
- **DELETE /todos/{id}**: Delete a specific todo

---

## Environment Variables

### Backend:

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=sqlite:///./todo.db
```

### Frontend:

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

---

## Testing

### Backend:

Run tests with `pytest`:

```bash
pytest
```

### Frontend:

Run tests with `npm`:

```bash
npm test
```

---

## Docker Support

### Build and run with Docker Compose:

1. Build and start the services:

   ```bash
   docker-compose up --build
   ```

2. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributions

Contributions are welcome! Please submit a pull request or open an issue for any improvements or suggestions.

---

## Contact

For questions or support, contact [your-email@example.com](mailto:your-email@example.com).

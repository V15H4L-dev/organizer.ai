import uvicorn
from fastapi import FastAPI
from app.controllers import include_routers
from app.data import models
from fastapi.middleware.cors import CORSMiddleware
from app.data.database import engine

app = FastAPI(title="Fastapi-CRUD")

''' Automatically create table in database if any model is created '''
models.Base.metadata.create_all(bind=engine) 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (use specific domains for better security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers (Authorization, Content-Type, etc.)
)

include_routers(app)

@app.get("/")
def home():
    return "Hello from fastapi"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port = 8000)
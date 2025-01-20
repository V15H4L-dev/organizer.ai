from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal, List


class User(BaseModel):
    name: str
    email: str
    password: str


class Todo(BaseModel):
    name: str
    description: str
    deadline: Optional[datetime]
    category: str
    status: Literal["pending", "completed"]
    color: str


class TodoOut(BaseModel):
    id: int
    name: str
    userId: int
    description: str
    deadline: Optional[datetime]
    category: str
    status: str
    color: str
    sentiment: str
    confidence: float


class TodoFilter(BaseModel):
    sort_order: Optional[str]
    category: Optional[str]
    status: Optional[str]
    sentiment: Optional[str]


class MarkAsDone(BaseModel):
    ids: List[int]


class UserOut(BaseModel):
    name: str
    email: str
    added_on: datetime  # This is expected to always be a datetime object
    updated_on: Optional[datetime]  # Make updated_on optional

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    name: str


class UserUpdate(BaseModel):
    name: Optional[str] = None  # Use Optional to indicate that the field can be None
    email: Optional[str] = None  # Same for email

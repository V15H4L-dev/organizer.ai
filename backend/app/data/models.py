from app.data.database import Base
from sqlalchemy import String, DateTime, Column, Integer


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    added_on = Column(DateTime(timezone=True))
    updated_on = Column(DateTime(timezone=True), default=None)


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer)
    name = Column(String)
    description = Column(String)
    category = Column(String)
    color = Column(String)
    sentiment = Column(String)
    status = Column(String)
    confidence = Column(String)
    deadline = Column(DateTime, default=None)
    added_on = Column(DateTime(timezone=True))
    updated_on = Column(DateTime(timezone=True), default=None)

from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from app.data.database import get_db
from app.data import schemas, models
from app.controllers.auth import (
    jwt_auth_wrapper,
)
from textblob import TextBlob
from app.controllers.auth import decode_auth_token
from datetime import datetime

router = APIRouter()


@router.post(
    "/getAllTodos",
    status_code=status.HTTP_200_OK,
    response_model=List[schemas.TodoOut],
    summary="Get the list of all todos with filters",
)
async def get_todos(
    request: schemas.TodoFilter,
    db: Session = Depends(get_db),
    authorization: str = Header(None),
    payload=Depends(jwt_auth_wrapper),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing or invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = authorization.split(" ")[1]
    user_info = decode_auth_token(token)
    try:
        query = db.query(models.Todo)  # Base query
        if request.category:
            query = query.filter(models.Todo.category == request.category)
        if request.status:
            query = query.filter(models.Todo.status == request.status)
        if request.sentiment:
            query = query.filter(models.Todo.sentiment == request.sentiment)
        # Apply ordering if provided
        if request.sort_order:
            order_by_deadline = (
                asc(models.Todo.deadline)
                if request.sort_order == "asc"
                else desc(models.Todo.deadline)
            )
            query = query.order_by(order_by_deadline)

        # Fetch all results
        todos = query.filter(models.Todo.userId == user_info["id"]).all()

        return todos
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Bad Request"
        )


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=List[schemas.TodoOut]
)
async def create_todo(
    request: schemas.Todo,
    db: Session = Depends(get_db),
    authorization: str = Header(None),
    payload=Depends(jwt_auth_wrapper),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing or invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )
    blob = TextBlob(request.description)
    polarity = blob.sentiment.polarity
    sentiment = (
        "POSITIVE" if polarity > 0 else "NEGATIVE" if polarity < 0 else "NEUTRAL"
    )

    token = authorization.split(" ")[1]
    user_info = decode_auth_token(token)
    new_todo = models.Todo(
        name=request.name,
        userId=user_info["id"],
        description=request.description,
        deadline=request.deadline,
        color=request.color,
        category=request.category,
        sentiment=sentiment,
        status=request.status,
        confidence=abs(polarity),
    )
    db.add(new_todo)
    db.commit()
    return db.query(models.Todo).all()


@router.put("/{todo_id}/", status_code=status.HTTP_202_ACCEPTED)
async def update_todo(
    todo_id: int,
    request: schemas.Todo,
    db: Session = Depends(get_db),
    payload=Depends(jwt_auth_wrapper),
):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id)
    if todo.first():
        todo_update_dict = request.dict(exclude_none=True)
        todo_update_dict["updated_on"] = datetime.now()
        blob = TextBlob(request.description)
        polarity = blob.sentiment.polarity
        sentiment = (
            "POSITIVE" if polarity > 0 else "NEGATIVE" if polarity < 0 else "NEUTRAL"
        )
        todo_update_dict["sentiment"] = sentiment
        todo_update_dict["confidence"] = polarity
        todo.update(todo_update_dict)
        db.commit()
        return "successfully updated the todo data"
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Not found user information for user_id {todo_id}",
    )


@router.delete("/{todo_id}/", status_code=status.HTTP_202_ACCEPTED)
async def delete_todo(
    todo_id: int, db: Session = Depends(get_db), payload=Depends(jwt_auth_wrapper)
):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo:
        db.delete(todo)
        db.commit()
        return "Successfully deleted todo"
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Not found user information for todo_id {todo_id}",
    )


@router.delete("/", status_code=status.HTTP_202_ACCEPTED)
async def delete_all_todos(
    db: Session = Depends(get_db), payload=Depends(jwt_auth_wrapper)
):
    try:
        db.query(models.Todo).delete()
        db.commit()
        return "Successfully flushed all the todos"
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unable to delete the todos data",
        )


@router.post(
    "/markAsDone",
    status_code=status.HTTP_200_OK,
    summary="mark many tasks as completed at once",
)
async def mark_as_done(
    request: schemas.MarkAsDone,
    db: Session = Depends(get_db),
    payload=Depends(jwt_auth_wrapper),
):
    try:
        # Update the status of tasks whose IDs are in the `ids` array
        db.query(models.Todo).filter(models.Todo.id.in_(request.ids)).update(
            {"status": "completed"}, synchronize_session=False
        )
        db.commit()

        return {"message": f"Tasks with IDs {request.ids} marked as completed."}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Bad Request"
        )

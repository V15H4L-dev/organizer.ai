from app.controllers.user import router as user_router
from app.controllers.login import router as login_router
from app.controllers.todo import router as todo_router


def include_routers(app):
    app.include_router(
        login_router, prefix = "/api/v1", tags = ['login']
    )

    app.include_router(
        user_router, prefix ="/api/v1/users", tags = ['User']
    )
    app.include_router(
        todo_router, prefix ="/api/v1/todo", tags = ['ToDo']
    )
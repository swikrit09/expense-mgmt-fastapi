from fastapi import APIRouter, Depends, HTTPException,Header,status,Response
from models import User
from models import Token
from fastapi.security import OAuth2PasswordRequestForm
from dependencies import create_access_token,get_current_user
from db.mongodb import users_collection
from typing import Optional



router = APIRouter()

@router.post("/register")
def register(user: User):
    users_collection.insert_one({"username": user.username, "password": user.password})
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: User):
    user_data = users_collection.find_one({"username": user.username})
    if(not user_data):
        raise HTTPException(status_code=401, detail="User not exist")
    if user_data and user_data["password"] == user.password:
        token = create_access_token(user.username)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    

def authenticate_user(username: str, password: str):
    user = users_collection.find_one({"username": username})
    if not user:
        return False
    return user

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(user["username"]) 
    return {"access_token": access_token, "token_type": "bearer"}



@router.get("/userauth")
async def user_auth(authorization: Optional[str] = Header(None)):
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    token = authorization[7:]
    # print(token)
    user = get_current_user(token)
    if user is None:
        return Response(content={"message": "Invalid token or user not found"}, status_code=status.HTTP_403_FORBIDDEN)

    return {"success": True, "data": {"user": user}}
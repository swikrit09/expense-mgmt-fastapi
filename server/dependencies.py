from fastapi import HTTPException, Depends,status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from jose import jwt, JWTError
from db.mongodb import users_collection
import datetime

SECRET_KEY = "mysecretTokennIdontwannaShareit"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")
        user_document = users_collection.find_one({"username": username})
        if user_document:
            user_document['_id'] = str(user_document['_id'])  # Convert ObjectId to string
            return user_document
        return None
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

def create_access_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

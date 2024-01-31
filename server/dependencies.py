from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from db.mongodb import users_collection
import datetime

SECRET_KEY = "mysecretTokennIdontwannaShareit"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return users_collection.find_one({"username": username})
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

def create_access_token(username: str):
    payload = {
        "sub": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

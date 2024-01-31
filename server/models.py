from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class Transaction(BaseModel):
    amount: float
    description: str
    type: str  # "income" or "expense"
    # user: str

class Token(BaseModel):
    access_token: str
    token_type: str


from fastapi import APIRouter, Depends,HTTPException
from models import Transaction
from models import User
from dependencies import get_current_user
from db.mongodb import transactions_collection

router = APIRouter()

@router.post("/transaction")
def add_transaction(transaction: Transaction, current_user : User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    transaction_data = transaction.dict()
    transaction_data["user"] = current_user.get("username")

    transactions_collection.insert_one(transaction_data)
    return {"message": "Transaction added successfully"}

@router.get("/income")
def get_income(current_user : User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    income = sum([t['amount'] for t in transactions_collection.find({"type": "income", "user": current_user["username"]})])
    return {"total_income": income}

@router.get("/incomelist")
def get_incomelist(current_user : User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    income = [t['amount'] for t in transactions_collection.find({"type": "income", "user": current_user["username"]})]
    return {"total_income": income}

@router.get("/expenselist")
def get_expenselist(current_user : User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    expense = [t['amount'] for t in transactions_collection.find({"type": "expense", "user": current_user["username"]})]
    return {"total_expense": expense}

@router.get("/expense")
def get_expense(current_user : User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    expense = sum([t['amount'] for t in transactions_collection.find({"type": "expense", "user": current_user["username"]})])
    return {"total_expense": expense}


@router.get("/remaining")
def get_remaining_amount(user: User = Depends(get_current_user)):
    income = sum([t['amount'] for t in transactions_collection.find({"type": "income", "user": user["username"]})])
    expense = sum([t['amount'] for t in transactions_collection.find({"type": "expense", "user": user["username"]})])
    return {"remaining_amount": income - expense,"user":user["username"]}

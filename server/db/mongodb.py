from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["expense_tracker"]
users_collection = db["users"]
transactions_collection = db["transactions"]
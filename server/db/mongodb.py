from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("DB_NAME")]
users_collection = db["users"]
transactions_collection = db["transactions"]
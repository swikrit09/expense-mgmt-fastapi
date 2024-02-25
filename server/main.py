from fastapi import FastAPI
from routes import transactions,auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

# Add CORSMiddleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",  # Allows specified origins (use ["*"] to allow all origins)
    allow_credentials=True,  # Allows cookies to be included in cross-origin requests
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers
)


# use Routers for auth and transaction
app.include_router(auth.router)
app.include_router(transactions.router)

@app.get("/")
async def init_message():
    return {"message":"Hello From the server"}

from fastapi import FastAPI
from routes import transactions,auth

app = FastAPI()


# use Routers for auth and transaction
app.include_router(auth.router)
app.include_router(transactions.router)

@app.get("/")
async def init_message():
    return {"message":"Hello From the server"}

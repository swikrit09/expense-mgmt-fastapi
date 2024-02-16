from typing import Union
from pydantic import BaseModel
from fastapi import Query

class User(BaseModel):
    username: str
    password: str

class Transaction(BaseModel):
    amount: float
    description: Union[str, None] = Query(default=None,max_length=50)
    type: str  # "income" or "expense"
    # user: str

class Token(BaseModel):
    access_token: str
    token_type: str

# we can also use Field from pydantic instead of Query,Path,Body from fastapi
# we can embed also the whole stuff in the body by embeded inside body
'''
from typing import Union

from fastapi import Body, FastAPI
from pydantic import BaseModel, Field
from typing_extensions import Annotated

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Union[str, None] = Field(
        default=None, title="The description of the item", max_length=300
    )
    price: float = Field(gt=0, description="The price must be greater than zero")
    tax: Union[float, None] = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Annotated[Item, Body(embed=True)]):
    results = {"item_id": item_id, "item": item}
    return results
'''

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


model = joblib.load('surplus_predictor.pkl')

CATEGORIES = ['milk', 'bread', 'fruits', 'meat', 'snacks']


COLUMNS_ORDER = [
    'stock_level',
    'days_to_expiry',
    'avg_daily_sales',
    'item_category_bread',
    'item_category_fruits',
    'item_category_meat',
    'item_category_milk',
    'item_category_snacks'
]


app = FastAPI()

class Item(BaseModel):
    stock_level: int
    days_to_expiry: int
    avg_daily_sales: float
    item_category: str

@app.post("/predict")
def predict_surplus(item: Item):
    df = pd.DataFrame([item.dict()])

    for cat in CATEGORIES:
        df[f'item_category_{cat}'] = (df['item_category'] == cat).astype(int)
    df = df.drop('item_category', axis=1)

    for col in COLUMNS_ORDER:
        if col not in df.columns:
            df[col] = 0
    df = df[COLUMNS_ORDER]


    prob_unsold = model.predict_proba(df)[0][0]

    if prob_unsold > 0.8:
        discount = 50
    elif prob_unsold > 0.5:
        discount = 30
    else:
        discount = 4

    return {
        "probability_unsold": round(prob_unsold, 2),
        "discount_percent": discount
    }

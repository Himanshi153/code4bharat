import pandas as pd
import joblib


model = joblib.load('surplus_predictor.pkl')

new_product = {
    'stock_level': [20],
    'days_to_expiry': [3],
    'avg_daily_sales': [2],
    'item_category': ['milk']
}

df_new = pd.DataFrame(new_product)

categories = ['milk', 'bread', 'fruits', 'meat', 'snacks']

for cat in categories:
    df_new[f'item_category_{cat}'] = (df_new['item_category'] == cat).astype(int)

df_new = df_new.drop('item_category', axis=1)

columns_order = [
    'stock_level',
    'days_to_expiry',
    'avg_daily_sales',
    'item_category_bread',
    'item_category_fruits',
    'item_category_meat',
    'item_category_milk',
    'item_category_snacks'
]

for col in columns_order:
    if col not in df_new.columns:
        df_new[col] = 0

df_new = df_new[columns_order]

prob_unsold = model.predict_proba(df_new)[0][0]

print(f"\nProbability of UNSOLD: {prob_unsold:.2f}")

def get_discount(prob):
    if prob > 0.8:
        return 50
    elif prob > 0.5:
        return 30
    else:
        return 4

discount = get_discount(prob_unsold)

print(f"\nSuggested Discount: {discount}%")
import pandas as pd
import numpy as np

np.random.seed(42)

categories = ['milk', 'bread', 'fruits', 'meat', 'snacks']

n = 500

data = {
    'item_category': np.random.choice(categories, n),
    'stock_level': np.random.randint(1, 100, n),
    'days_to_expiry': np.random.randint(1, 10, n),
    'avg_daily_sales': np.random.uniform(1, 20, n),
}

df = pd.DataFrame(data)

df['sold_in_time'] = (df['avg_daily_sales'] * df['days_to_expiry'] > df['stock_level']).astype(int)

print(df.head())

# Save to CSV
df.to_csv('mock_data.csv', index=False)
print("Mock data saved to mock_data.csv")

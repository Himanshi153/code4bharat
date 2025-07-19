import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

df = pd.read_csv('mock_data.csv')
print(df.head())


df_encoded = pd.get_dummies(df, columns=['item_category'])
print(df_encoded.head())


X = df_encoded.drop('sold_in_time', axis=1)
y = df_encoded['sold_in_time']


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy:.2f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))


joblib.dump(model, 'surplus_predictor.pkl')
print("\nModel saved as surplus_predictor.pkl")

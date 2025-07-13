import sys
import json
import numpy as np
import joblib

# Load pre-trained model (you'll train this separately)
model = joblib.load('ai/surplus_model.pkl')

# Read JSON input from Node.js
input_data = json.loads(sys.stdin.read())

# Convert to feature vector
X = np.array([
    input_data['days_to_expiry'],
    input_data['category_encoded'],
    input_data['stock_level'],
    input_data['demand_score']
]).reshape(1, -1)

# Predict unsold risk
unsold_prob = model.predict_proba(X)[0][1]  # Probability of being unsold
discount = min(int(unsold_prob * 100), 50)  # Recommend up to 50% discount

output = {
    "unsold_risk": round(unsold_prob, 2),
    "recommended_discount": discount
}

print(json.dumps(output))

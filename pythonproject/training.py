import json
import pickle
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

data = [
    {"error": "TimeoutError: waiting for selector .submit-button failed", "label": "flaky"},
    {"error": "TypeError: Cannot read property 'length' of undefined", "label": "critical"},
    {"error": "Error: ENOENT: no such file or directory, open '/tmp/config.json'", "label": "infra"},
    {"error": "Error: Process completed with exit code 1.", "label": "critical"},
    {"error": "1 of 1 failed", "label": "critical"},
    {"error": "Timed out retrying after 4000ms", "label": "flaky"},
    {"error": "Cannot connect to database server", "label": "infra"},
    {"error": "ReferenceError: x is not defined", "label": "critical"},
    {"error": "NetworkError: Failed to fetch", "label": "infra"},
    {"error": "Element not found: .login-button", "label": "flaky"},
    {"error": "SyntaxError: Unexpected token < in JSON", "label": "critical"},
    {"error": "Permission denied accessing /var/log/app.log", "label": "infra"},
    {"error": "Error: <non-zero> of <non-zero> failed", "label": "critical"}
]

X = [item["error"] for item in data]
y = [item["label"] for item in data]

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression(max_iter=1000))
])

pipeline.fit(X, y)

with open("error_classifier.pkl", "wb") as f:
    pickle.dump(pipeline, f)
print("Model trained and saved as error_classifier.pkl")
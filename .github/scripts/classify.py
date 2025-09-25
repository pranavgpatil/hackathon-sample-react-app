import sys
import joblib

text = sys.argv[1]

model = joblib.load('failure_classifier.pkl')
vectorizer = joblib.load('vectorizer.pkl')

X = vectorizer.transform([text])
pred = model.predict(X)

print(pred[0])
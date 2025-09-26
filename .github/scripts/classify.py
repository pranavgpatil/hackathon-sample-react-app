import sys
import os
import joblib

text = sys.argv[0]

model = joblib.load('.github/scripts/error_classifier.pkl')
# model = joblib.load('failure_classifier.pkl')
# vectorizer = joblib.load('vectorizer.pkl')

# X = vectorizer.transform([text])
pred = model.predict([text])

print(pred[0])
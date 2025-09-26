import pickle

with open("error_classifier.pkl", "rb") as f:
    model = pickle.load(f)


new_error = "TimeoutError:"

predicted_label = model.predict([new_error])[0]

print(f"Predicted label: {predicted_label}")
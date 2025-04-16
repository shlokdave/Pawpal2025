from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from tensorflow.keras.models import load_model
# from PIL import Image
# import numpy as np
# import io
import os
# import importlib.util

# ✅ Load paths
BASE_DIR = os.path.dirname(__file__)
# MODEL_PATH = os.path.join(BASE_DIR, "breed_model.h5")
# LABELS_PATH = os.path.join(BASE_DIR, "labels.py")

# ✅ Load labels (commented out)
# spec = importlib.util.spec_from_file_location("labels", LABELS_PATH)
# labels_module = importlib.util.module_from_spec(spec)
# spec.loader.exec_module(labels_module)
# breed_labels = labels_module.breed_labels

# ✅ Init app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model (commented out)
# model = load_model(MODEL_PATH)

@app.get("/")
def read_root():
    return {"message": "PawPal Backend Running ✅"}

# 🛑 Commenting out the prediction route
# @app.post("/predict")
# async def predict_breed(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         image = Image.open(io.BytesIO(contents)).resize((224, 224)).convert("RGB")
#         img_array = np.array(image) / 255.0
#         img_array = np.expand_dims(img_array, axis=0)

#         predictions = model.predict(img_array)[0]
#         top_indices = predictions.argsort()[-3:][::-1]

#         top_results = [
#             {
#                 "breed": breed_labels[i].split("-")[-1].replace("_", " ").title(),
#                 "confidence": round(float(predictions[i]) * 100, 2)
#             }
#             for i in top_indices
#         ]

#         return {"predictions": top_results}

#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

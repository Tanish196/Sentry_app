import pandas as pd, json, numpy as np

features   = pd.read_csv("../datasets/features.csv")
scores     = pd.read_csv("../datasets/all_area_scores.csv")
metadata   = json.load(open("../models/model_metadata.json"))

FEAT_COLS  = metadata["feature_names"]   # 32 features
BASE_FEATS = metadata["base_features"]  

df = features.merge(scores[["boundary_POL_STN_NM","base_score","risk_category"]],
                    on="boundary_POL_STN_NM", how="left")

records = []
for _, row in df.iterrows():
    record = {
        "area_id":       row["boundary_POL_STN_NM"],   # partition key
        "base_score":    round(float(row["base_score"]), 2) if pd.notna(row["base_score"]) else None,
        "risk_category": str(row["risk_category"]) if pd.notna(row["risk_category"]) else "Unknown",
        "features": {
            col: round(float(row[col]), 4) if pd.notna(row[col]) else 0.0
            for col in BASE_FEATS if col in df.columns
        }
    }
    records.append(record)

with open("../datasets/feature_store.json", "w") as f:
    json.dump(records, f, indent=2)
import pandas as pd
def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    if {"Year", "Month", "Date"}.issubset(df.columns):
        df["full_date"] = pd.to_datetime({
            'year': df["Year"], 
            'month': df["Month"], 
            'day': df["Date"] 
        }, errors="coerce")
        
        df["Day"] = df["Date"] 
        df["Date"] = df["full_date"]
    else:
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

    df = df.dropna(subset=["Date"]).sort_values("Date")

    weather_cols = ["Avg Temperature", "Avg Humidity", "Total Precipitation"]
    available_cols = [c for c in weather_cols if c in df.columns]
    
    for col in available_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df[available_cols] = df[available_cols].interpolate(method="linear")
    for col in available_cols:
        df[col] = df[col].fillna(df[col].median())

    return df[["Date"] + available_cols].copy()
from pathlib import Path

import pandas as pd


# 1. Paths and loading
BASE_DIR = Path(__file__).resolve().parent.parent
INPUT_PATH = BASE_DIR / "datasets" / "raw" / "aqi" / "delhi_aqi_with_police_areas.csv"
OUTPUT_PATH = BASE_DIR / "datasets" / "processed" / "aqi" / "aqi_processed.csv"


def load_data() -> pd.DataFrame:
    try:
        return pd.read_csv(INPUT_PATH)
    except FileNotFoundError as exc:
        raise FileNotFoundError(f"Missing input file: {exc.filename}") from exc


# 2. Cleaning and processing
def convert_to_list(value: str) -> list[str]:
    parts = str(value).split(",")
    return [part.strip() for part in parts if part.strip()]


def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df["Police_Station_Areas"] = df["Police_Station_Areas"].apply(convert_to_list)
    df = df.explode("Police_Station_Areas")

    df["Police_Station_Areas"] = (
        df["Police_Station_Areas"].astype(str).str.strip().str.upper()
    )
    df = df[df["Police_Station_Areas"] != ""]

    df = df.sort_values(["Police_Station_Areas", "Date"])
    df["AQI"] = (
        df.groupby("Police_Station_Areas")["AQI"]
        .apply(lambda series: series.ffill().bfill())
        .reset_index(level=0, drop=True)
    )
    df["AQI"] = df["AQI"].fillna(df["AQI"].median())

    return df[["Police_Station_Areas", "Date", "AQI"]].copy()


# 3. Save
def main() -> None:
    df = load_data()
    processed_df = preprocess_data(df)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    processed_df.to_csv(OUTPUT_PATH, index=False)
    print(f"Saved {len(processed_df)} rows to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

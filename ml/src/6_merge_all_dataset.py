
from pathlib import Path

import pandas as pd
from sklearn.impute import SimpleImputer


# 1. Paths and loading
BASE_DIR = Path(__file__).resolve().parent.parent
CRIME_PATH = BASE_DIR / "datasets" / "processed" / "crime" / "crime_processed.csv"
ACCIDENT_PATH = BASE_DIR / "datasets" / "processed" / "accident" / "accident_processed.csv"
SAFETIPIN_PATH = (
    BASE_DIR / "datasets" / "processed" / "safetipin" / "safetipin_processed.csv"
)
AQI_PATH = BASE_DIR / "datasets" / "processed" / "aqi" / "aqi_processed.csv"
WEATHER_PATH = BASE_DIR / "datasets" / "processed" / "weather" / "weather_processed.csv"
OUTPUT_PATH = BASE_DIR / "datasets" / "processed" / "final_dataset.csv"


def load_data() -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    try:
        crime = pd.read_csv(CRIME_PATH)
        accident = pd.read_csv(ACCIDENT_PATH)
        safetipin = pd.read_csv(SAFETIPIN_PATH)
        aqi = pd.read_csv(AQI_PATH, parse_dates=["Date"])
        weather = pd.read_csv(WEATHER_PATH, parse_dates=["Date"])
        return crime, accident, safetipin, aqi, weather
    except FileNotFoundError as exc:
        raise FileNotFoundError(f"Missing input file: {exc.filename}") from exc


# 2. Processing and merge
def distribute_date(df: pd.DataFrame, date_col: str) -> pd.DataFrame:
    df[date_col] = pd.to_datetime(df[date_col], errors="coerce")
    df["day"] = df[date_col].dt.day
    df["month"] = df[date_col].dt.month
    return df


def build_final_dataset(
    crime: pd.DataFrame,
    accident: pd.DataFrame,
    safetipin: pd.DataFrame,
    aqi: pd.DataFrame,
    weather: pd.DataFrame,
) -> pd.DataFrame:
    merged = crime.merge(
        accident,
        left_on="District",
        right_on="Traffic_Districts",
        how="left",
    )

    merged = merged.merge(
        safetipin,
        left_on="nm_pol",
        right_on="Police_Station",
        how="left",
    )

    imputer = SimpleImputer(strategy="median")
    merged[["Safety Score"]] = imputer.fit_transform(merged[["Safety Score"]])

    date_df = aqi.merge(weather, on="Date", how="inner")

    merged = date_df.merge(
        merged,
        left_on="Police_Station_Areas",
        right_on="nm_pol",
        how="inner",
    )
    merged = distribute_date(merged, "Date")

    merged = merged.drop(
        columns=["nm_pol", "District", "Police_Station", "Date"],
        errors="ignore",
    )
    return merged


# 3. Save
def main() -> None:
    crime, accident, safetipin, aqi, weather = load_data()
    final_df = build_final_dataset(crime, accident, safetipin, aqi, weather)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    final_df.to_csv(OUTPUT_PATH, index=False)
    print(f"Saved {len(final_df)} rows to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()

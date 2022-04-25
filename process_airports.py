import pandas as pd


df = pd.read_csv('airports.csv')

print(df.info())

df = df[df['iata_code'].notna()]

print(df.info())

df.to_csv('airports_clean.csv')

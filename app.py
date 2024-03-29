from flask import Flask, render_template, request, url_for, redirect, g, session, jsonify
import requests
import yaml
from flask_cors import CORS
import json
from requests_toolbelt.utils import dump
import pandas as pd

import datetime
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import pymongo

app = Flask(__name__)
CORS(app)

creds = yaml.safe_load(open("creds.yaml", "r"))

load_dotenv()
MONGODB_URI = creds['MONGODB_URI']

CLIENT_ID = creds['GOOGLE_CLIENT_ID']

client = MongoClient(MONGODB_URI)

# @app.route("/", methods=["GET"])
# def index():
#     return render_template("index.html")


@app.route("/get_flights", methods=["GET"])
def get_flights():

    dept_date = str(request.args.get('dept_date'))
    origin = str(request.args.get('origin'))
    one_way = request.args.get('oneWay')
    nonStop = request.args.get('nonStop')
    rain = bool(request.args.get('rain'))
    min_temp = request.args.get('min_temp')

    user_id = 1
    db = client['main']
    searches = db['searches']
    searches.insert_one({
        'dept_date': dept_date,
        'origin': origin,
        'one_way': one_way,
        'non_stop': nonStop,
        'rain': rain,
        'min_temp': min_temp
    })

    api_key = creds['API_KEY']
    api_secret = creds['API_SECRET']

    token_request = requests.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        data={
            'grant_type': 'client_credentials',
            'client_id': api_key,
            'client_secret': api_secret
        }
    )

    print("This is my token request")
    print(token_request)

    token = token_request.json()['access_token']
    bearer = 'Bearer {}'.format(token)

    flights = requests.get(
        'https://test.api.amadeus.com/v1/shopping/flight-destinations',
        headers={
            'Authorization': bearer
        },
        params={
            'origin': origin,
            'departureDate': dept_date,
            'oneWay': one_way,
            'nonStop': nonStop
        }
    )

    flights_json = flights.json()['data']
    dests = []
    dept_dates = []
    prices = []
    for flight in flights_json:
        # print(flight)
        dests.append(flight['destination'])
        dept_dates.append(flight['departureDate'])
        prices.append(flight['price']['total'])
    # print(dests)

    names = []
    locations = []

    suitable_names = []
    suitable_prices = []
    suitable_date = []
    suitable_origin = []

    for dest, price in zip(dests, prices):
        # print(dest)

        location, name = get_location_from_code(dest)

        # Just for testing purposes
        temps, rain = get_weather_daily(location)
        # print(name)
        # print(temps)
        # print(rain)

        names.append(name)
        locations.append(location)

        # assume 2 day trip
        if fits_criteria(location, min_temp, False, 0, 2):
            suitable_names.append(name)
            suitable_prices.append(price)
            suitable_date.append(dept_date)
            suitable_origin.append(origin)

    print('suitable locations')
    print(suitable_names)
    print(suitable_prices)

    # print(flights.json)
    # print(flights.text)
    # print(flights.status_code)
    # print(flights.content)

    # modified by merna
    jsonList = []

    for i in range(0, len(suitable_names)):
        jsonList.append(
            {"origin": suitable_origin[i], "dept_date": suitable_date[i], "destination": suitable_names[i], "price": suitable_prices[i]})

    # print(json.dumps(jsonList, indent=1))

    return json.dumps(jsonList, indent=1)

# merna modified


@app.route("/get_search", methods=["GET"])
def get_search():
    db = client['main']
    searches = db['searches']

    pastSearch = searches.find().sort('_id', pymongo.DESCENDING).limit(1)
    print(pastSearch[1])
    return {"dept_date": pastSearch[1]['dept_date'], "min_temp": pastSearch[1]['min_temp'], "origin": pastSearch[1]['origin']}


# @ app.route("/get_id", methods=["GET"])
# def get_id():
#     print(CLIENT_ID)
#     return {'CLIENT_ID': CLIENT_ID}


@ app.route("/test", methods=["GET"])
def test():

    for db_info in client.list_database_names():
        print(db_info)

    print('Collections')
    # print(mydb.list_collection_names())
    return 'Hello'


def fits_criteria(location, min_temp, no_rain, start, end):
    # start and end are days from today, start inclusive, end exclusive (for example start=1, end=2 would be one day, tomorrow)
    temps, rain = get_weather_daily(location)
    temps = temps[start:end]
    rain = rain[start:end]

    if True in rain and no_rain:
        return False

    for temp in temps:
        if temp < int(min_temp):
            return False

    # if it fits return the temperatures on the days
    return temps


def get_weather_daily(location):
    # get the next 7 days of weather for the location

    key = creds['OPEN_WEATHER_KEY']

    lat = location[0]
    long = location[1]

    url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + \
        str(lat) + '&lon=' + str(long) + '&appid=' + \
        key + '&exclude=current,minutely,hourly,alerts'

    req = requests.get(url)

    req_json = req.json()

    days = [int(kelvinToFahrenheit(req_json['daily'][i]['temp']['day']))
            for i in range(0, 7)]
    rain = [True if 'rain' in req_json['daily']
            [i] else False for i in range(0, 7)]

    print(rain)

    f = open('test.json', 'w')
    f.write(json.dumps(req_json))
    f.close()

    return days, rain


def kelvinToFahrenheit(kelvin):
    return kelvin * 1.8 - 459.67


def get_weather(lat, long):
    # locations is an array of locations
    key = creds['OPEN_WEATHER_KEY']

    url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + \
        str(lat) + '&lon=' + str(long) + '&appid=' + \
        key + '&exclude=current,minutely,hourly,alerts'

    req = requests.get(url)

    return req.json()


def get_location_from_code(code):

    df = pd.read_csv('airports_clean.csv')

    row = df.loc[df['iata_code'] == code]

    lat = row.iloc[0]['latitude_deg']
    long = row.iloc[0]['longitude_deg']

    country = row.iloc[0]['iso_country']
    mun = row.iloc[0]['municipality']

    name = mun + ', ' + country

    print(name)

    print('lat: ' + str(lat))
    print('long: ' + str(long))

    # print("(lat,long): (" + str(lat) + ", " + str(long) + ")")

    return [lat, long], name

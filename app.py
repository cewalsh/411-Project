from flask import Flask, render_template, request, url_for, redirect, g, session, jsonify
import requests, yaml
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

creds = yaml.safe_load(open("creds.yaml", "r"))

@app.route("/", methods=["GET"])
def index():
    return "Hello World"

@app.route("/get_flights", methods=["GET"])
def get_flights():
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"

    api_key = creds['API_KEY']
    api_secret = creds['API_SECRET']

    token_request = requests.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        data = {
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
        headers = {
            'Authorization': bearer 
        },
        params = {
            'origin': 'BOS',
            'departureDate': '2022-04-09',
            'oneWay' : 'false',
            'nonStop' : 'false'
        }
    )

    # print(flights.json)
    print(flights.text)
    # print(flights.status_code)
    # print(flights.content)

    return flights.text



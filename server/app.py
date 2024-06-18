import time
from flask import Flask, jsonify
from flask_cors import CORS
import json
import random
import pytz
import schedule
import threading

app = Flask(__name__)
CORS(app)

with open("recipes.json", "r") as f:
    recipes = json.load(f)

selected_recipe = {}


def select_random_recipe():
    global selected_recipe
    selected_recipe = random.choice(recipes)


def job():
    # Schedule job to run daily at 6:30 AM EST
    est = pytz.timezone("US/Eastern")
    schedule.every().day.at("06:30").do(select_random_recipe)
    while True:
        schedule.run_pending()
        time.sleep(1)


job_thread = threading.Thread(target=job)
job_thread.start()


@app.get("/recipes")
def get_all_recipes():
    return jsonify(recipes)


@app.get("/random_recipe")
def get_random_recipe():
    return jsonify(selected_recipe)


# Endpoint to manually trigger selecting random recipe
@app.route("/trigger_random_recipe", methods=["GET"])
def trigger_random_recipe():
    select_random_recipe()
    return jsonify(selected_recipe)

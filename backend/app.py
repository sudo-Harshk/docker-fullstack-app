from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
import os
from sqlalchemy import text

app = Flask(__name__)
CORS(app)  

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/mydb")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
db = SQLAlchemy(app)

@app.route("/")
def home():
    return jsonify({"message": "Aloha, Kiddo!"})

@app.route("/users", methods=["GET"])
def get_users():
    users = db.session.execute(text("SELECT * FROM users")).fetchall()
    return jsonify([{"id": u[0], "name": u[1]} for u in users])

@app.route("/users", methods=["POST"])
def add_user():
    data = request.json  # Get data from frontend
    name = data.get("name")

    if not name:
        return jsonify({"error": "Name is required"}), 400

    db.session.execute(text("INSERT INTO users (name) VALUES (:name)"), {"name": name})
    db.session.commit()

    return jsonify({"message": "User added successfully!"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
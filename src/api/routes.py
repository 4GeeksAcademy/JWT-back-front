"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():
    return jsonify({"msg": "Hola la ruta funciona correctamente"}), 200



@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #Buscar el usuario en la base de datos (por email)
    user = User.query.filter_by(email=email).first()
    print(user)

    if user is None:
        return jsonify({"msg": "Email incorrecto"}) , 401
    if password != user.password:
        return jsonify({"msg": "Constraseña incorrecta"}) , 401
    
    #Creamos el token
    access_token = create_access_token(identity=email)
    #Devolvernos el token como JSON
    return jsonify(access_token=access_token)




@api.route("/signup", methods=["POST"])
def signup():
    #Obtenemos el cuerpo de la solicitud (en formato JSON)
    body = request.get_json()
    print(body)

    #Buscar el usuario en la base de datos (por email)
    user = User.query.filter_by(email=body["email"]).first()
    print(user)

    #Si no encuentra usuario con ese mail, creamos uno nuevo
    if user is None:
        user = User(email=body["email"], password=body["password"], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado"}) , 200
    else:
        return jsonify({"msg": "Usuario ya existe"}) , 401



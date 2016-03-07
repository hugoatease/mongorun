from flask import Flask, render_template
from flask_restful import Api, Resource, reqparse, marshal_with, fields
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from bson.objectid import ObjectId
from hashlib import md5
import os

app = Flask(__name__)
app.config['DEBUG'] = True

api = Api(app)

profile_fields = {
    '_id': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'email': fields.String,
    'avatar': fields.String
}

run_fields = {
    '_id': fields.String,
    'profile_id': fields.String,
    'duration': fields.Integer,
    'kilometers': fields.Integer
}

if 'MONGO_HOST' in os.environ:
    host = os.environ['MONGO_HOST']
else:
    host = 'localhost'

client = MongoClient(host=host, port=27017)
db = Database(client, 'mongorun')

profiles = Collection(db, 'profiles')
runs = Collection(db, 'runs')


class ProfilesListResource(Resource):
    @marshal_with(profile_fields)
    def get(self):
        return list(profiles.find({}))

    @marshal_with(profile_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('first_name', type=unicode, required=True)
        parser.add_argument('last_name', type=unicode, required=True)
        parser.add_argument('email', type=unicode, required=True)
        args = parser.parse_args()

        doc = {
            'first_name': args['first_name'],
            'last_name': args['last_name'],
            'email': args['email'],
            'avatar': 'https://secure.gravatar.com/avatar/' + md5(args['email']).hexdigest() + '?d=identicon&s=200'
        }

        result = profiles.insert_one(doc)
        doc['_id'] = str(result.inserted_id)

        return doc


class ProfilesResource(Resource):
    @marshal_with(profile_fields)
    def get(self, profile_id):
        return profiles.find_one({'_id': ObjectId(profile_id)})


class ProfilesRunsResource(Resource):
    @marshal_with(run_fields)
    def get(self, profile_id):
        return list(runs.find({'profile_id': ObjectId(profile_id)}))


class RunListResource(Resource):
    @marshal_with(run_fields)
    def get(self):
        return list(runs.find({}))

    @marshal_with(run_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('profile_id', type=unicode, required=True)
        parser.add_argument('duration', type=int, required=True)
        parser.add_argument('kilometers', type=int, required=True)
        args = parser.parse_args()

        doc = {
            'profile_id': ObjectId(args['profile_id']),
            'duration': args['duration'],
            'kilometers': args['kilometers']
        }

        result = runs.insert_one(doc)
        doc['_id'] = str(result.inserted_id)

        return doc


class RunResource(Resource):
    @marshal_with(run_fields)
    def get(self, run_id):
        return runs.find_one({'_id': ObjectId(run_id)})

    def delete(self, run_id):
        count = runs.delete_one({'_id': ObjectId(run_id)}).deleted_count
        if count > 0:
            return 'DELETED', 204
        else:
            return 'Bad Run ID', 404

api.add_resource(ProfilesListResource, '/api/profiles')
api.add_resource(ProfilesResource, '/api/profiles/<profile_id>')
api.add_resource(ProfilesRunsResource, '/api/profiles/<profile_id>/runs')
api.add_resource(RunListResource, '/api/runs')
api.add_resource(RunResource, '/api/runs/<run_id>')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def index_path(path):
    return render_template('index.html')

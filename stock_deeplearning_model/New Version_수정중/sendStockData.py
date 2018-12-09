import pymongo
from pymongo import MongoClient

client = MongoClient("localhost",27017)

database = client.MrStock
collectionA = database.stockUpList

def insert(company, present, predict, state):
    collectionA.insert({
        "company": company,
        "present_price": present,
        "predict_price": predict,
        "state": state
    })

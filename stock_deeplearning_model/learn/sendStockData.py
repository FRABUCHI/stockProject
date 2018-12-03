import pymongo
from pymongo import MongoClient

#client = MongoClient("localhost",27017)
client = MongoClient("52.79.240.43",27017)

database = client.MrStock
collection = database.stockUpList

def update(company, present, predict, loss, state, url):
    collection.update_one(
        {
            "company": company
        },
        {
            "$set": {
                "company": company,
                "present_price": present, 
                "predict_price": predict, 
                "loss": loss, 
                "state": state,
                "url": url
            }
        },
        True
    )

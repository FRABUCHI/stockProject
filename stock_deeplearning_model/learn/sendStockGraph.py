import pymongo
from pymongo import MongoClient
import gridfs

#client = MongoClient("localhost",27017)
client = MongoClient("52.79.240.43",27017)

database = client.MrStock
fs = gridfs.GridFS(database)
#fs = gridfs.GridFS(database, collection="stockUpList")

def insert(name):
    
    fs.update({"company": name},{"metadata": open ('{}.png'.format(name), 'r').metadata})
    #fs.put( open ('{}.png'.format(name), 'r'), company=name)
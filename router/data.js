module.exports = {
    findAll: async (dbs, collectionName) => {
        return await dbs.collection(collectionName).find({}).toArray();
    },
    findByObj: async (dbs, collectionName, obj) => {
        return await dbs.collection(collectionName).find(obj).toArray();
    },
    addData: async (dbs, collectionName, obj) => {
        return await dbs.collection(collectionName).insertOne(obj);
    },
    findOne: async (dbs, collectionName, obj) => {
        return await dbs.collection(collectionName).findOne(obj);
    },
    updateData: async (dbs, collectionName, query, newValue) => {
        return await dbs.collection(collectionName).updateOne(query, newValue);
    },
    findByMatch: async (dbs, collectionName, filterArray) => {
        return await dbs.collection(collectionName).aggregate(filterArray).toArray();
    }
}
import { MongoClient } from "mongodb";
import "dotenv/config"

const uri: string = process.env.CONN_URI || '';
const client = new MongoClient(uri);

const database = client.db(process.env.DB_NAME);

const users_collection = database.collection("users");
const tasks_collection = database.collection("tasks");
const orders_collection = database.collection("orders");
const order_items_collection = database.collection("order_items");
const requesters_collection = database.collection("requesters");

export { 
    users_collection, tasks_collection, orders_collection, 
    order_items_collection, requesters_collection, 
};
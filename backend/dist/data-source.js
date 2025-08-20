"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, './entities/**.{ts,js}');
    const migrationsPath = path_1.default.join(__dirname, './migrations/**.{ts,js}');
    const dbUrl = process.env.DB_URL || '';
    if (!dbUrl)
        throw new Error("Missing env var: 'DATABASE_URL'");
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'test') {
        return {
            type: 'sqlite',
            database: ':memory',
            synchronize: true,
            entities: [entitiesPath]
        };
    }
    ;
    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    };
};
// const usersCollection: Collection<IUser> = database.collection("users");
// const tasksCollection: Collection<ITask> = database.collection("tasks");
// const ordersCollection: Collection<IOrder> = database.collection("orders");
// const orderItemsCollection: Collection<IOrderItem> = database.collection("orderItems");
// const customersCollection: Collection<ICustomer> = database.collection("customers");
// const transationsCollection: Collection<ITransaction> = database.collection("transactions");
exports.AppDataSource = new typeorm_1.DataSource(dataSourceConfig());

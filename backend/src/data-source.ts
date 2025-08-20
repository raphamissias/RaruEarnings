import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";


const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts, js}');
    const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}');

    const dbUrl: string = process.env.DB_URL || '';

    if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if (nodeEnv === 'test') {
        return {
            type: 'sqlite',
            database: ':memory',
            synchronize: true,
            entities: [entitiesPath]
        };
    };

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

export const AppDataSource = new DataSource(dataSourceConfig());
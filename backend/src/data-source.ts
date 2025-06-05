import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Quiz } from "./entity/Quiz";
import { Question } from "./entity/Question";
import { Note } from "./entity/Note";
import { Account } from "./entity/Account";
import { Enroll } from "./entity/Enroll";
import * as dotenv from 'dotenv';
import * as mysql2 from 'mysql2';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  driver: mysql2,
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",  // Using 'root' as the password
  database: "quiz",
  synchronize: true, // Changed to false to prevent automatic table creation
  logging: true,
  entities: [User, Question, Quiz, Note, Account, Enroll],
  migrations: [],
  subscribers: [],
  extra: {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
});

// Initialize the database connection
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Connection initialized with database...");
    }
    return AppDataSource;
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};

export const getDataSource = async (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return AppDataSource;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const dataSource = await initializeDatabase();
        resolve(dataSource);
      } catch (error) {
        reject("Failed to create connection with database");
      }
    }, delay);
  });
};

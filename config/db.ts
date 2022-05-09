import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () => {
  try {
    const DB_URI: string = process.env.DB_URI!;

    await connect(DB_URI);

    console.log(`MongoDb Connected Successfully`);
  } catch (error: any) {
    console.log(`Error while connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;

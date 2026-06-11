import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server Running On ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
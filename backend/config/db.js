import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI);
//     // console.log(
//     //   `MongoDB connected successfully on host: ${connection.connection.host}, database: ${connection.connection.db.databaseName}`
//     // );
//     return connection;
//   } catch (error) {
//     console.error(`MongoDB connection error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;


// const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to Database")
    })
  } catch (error) {
    console.error("Connection failed")
    process.exit(0)
  }

}

export default connectDB;

require('dotenv').config();
import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    } as ConnectOptions);
    console.log('Successfully connected to db');
  } catch(err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

export default connectDB;
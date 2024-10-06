import mongoose from 'mongoose';

export async function connect() {
    console.log(process.env.MONGO_URI);
  try {
    // Check if the connection is already established to prevent multiple connections
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB is already connected.");
      return;
    }

    // Establish a new connection to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB Connected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error: ', err);
      process.exit(1); // Exit the process with an error
    });
  } catch (error) {
    console.error('Error while connecting to MongoDB: ', error.message);
    process.exit(1); // Exit the process with a failure code
  }
}

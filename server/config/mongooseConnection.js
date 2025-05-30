import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to MongoDB Atlas!");
    } catch (error) {
        console.error('Error:', error);
    }
}    

main().catch(console.error);

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });


export default mongoose.connection;
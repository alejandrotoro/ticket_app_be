import mongoose from 'mongoose';

async function databaseSetUp() {
  const connected: boolean = await conncetToDataBase();
  if (!connected) {
    process.exit(1);
  }
}

async function conncetToDataBase(): Promise<boolean> {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  try {
    await mongoose.connect('mongodb://localhost/ticketapp', connectionOptions);
    console.log("Connected to database");
    return true;
  } catch (error) {
    console.log("Error while connecting to database");
    return false;
  }
}

export { databaseSetUp };

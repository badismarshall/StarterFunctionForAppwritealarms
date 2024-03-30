import { Client, Database, Query} from 'node-appwrite';

// Initialize the Appwrite SDK
const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1'); // Replace with your Appwrite endpoint
client.setProject('65466df763778e058c34'); // Replace with your Appwrite project ID

// Initialize the Database service
const database = new Database(client);

export default async ({ res, log }) => {
    // // we need to add the required fields to the .env file
    // throwIfMissing(process.env, [
    //   'APPWRITE_API_KEY',
    //   'RETENTION_PERIOD_DAYS',
    //   'APPWRITE_BUCKET_ID',
    // ]);

    // Get the current time
    const currentTime = new Date().toISOString();
    // Query the database for alarms that are due to be triggered
    const alarms = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_ALARMS_COLLECTION_ID,
      [
        Query.lessThanEqual("timealarm", currentTime),
      ]
    );
  return res.send(alarms, 200);
};


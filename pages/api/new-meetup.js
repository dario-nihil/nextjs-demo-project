import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://dario:MtJTi%40nPXM26_9%23@cluster0.cywid.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();
    res.status(201).json({ message: "Meetup inserted! " });
  }
};

export default handler;

import { MongoClient } from "mongodb";

// api/new-meetup
// POST / api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // could add error handling

    // because this is on the api Route it is secure to store credentials
    // because this code will never end up on the client side
    const client = await MongoClient.connect(
      "mongodb+srv://new_user_01:Meetupspassword@cluster0.z0ohbpq.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;

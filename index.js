const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middaleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple crud server running");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://simple-crud:mymrO7STGQUgzEul@cluster0.dijqngy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("userDb");
    const userCollection = await database.collection("users");
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple crud server is running on ${port}`);
});

// simple-crud
// mymrO7STGQUgzEul

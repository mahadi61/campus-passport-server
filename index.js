const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000


// middleware
app.use(cors());
app.use(express.json());



// TODO: set env for password
// userName: campusDB
// pass: MjOYYTAuUp8JYnxA

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://campusDB:MjOYYTAuUp8JYnxA@cluster0.2ev6cf0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// database collection

const collegeCollection = client.db("campusDB").collection("colleges");
const userCollection = client.db("campusDB").collection("users");
const myCollegeCollection = client.db("campusDB").collection("myCollege");



// to get all colleges
app.get('/all-colleges', async (req, res)=>{
  const result = await collegeCollection.find().toArray();
  res.send(result);
})
// to get featured colleges
app.get('/featured-colleges', async (req, res)=>{
  const result = await collegeCollection.find().limit(3).toArray();
  res.send(result);
})

// store user data on database
app.post('/add-user', async(req, res)=>{
  const userInfo = req.body;
  const result = await userCollection.insertOne(userInfo);
  res.send(result);
})













app.get('/', (req, res) => {
  res.send('Campus passport server is running')
})

app.listen(port, () => {
  console.log(`Campus passport server is running port ${port}`)
})
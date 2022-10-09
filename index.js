const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server side is working");
});

const uri = `mongodb+srv://${process.env.MOTODEAL_USER}:${process.env.MOTODEAL_PASS}@cluster0.uawktuq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try{
        await client.connect();
        console.log('db connect')
        const inventoryCollection = client.db("motodeal").collection("inventory-motodeal");

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        });

        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const inventorys = await inventoryCollection.findOne(query);
            res.send(inventorys);
        })

    }
    finally {

    }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log('Listening to port', port)
} );
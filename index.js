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

const uri = `mongodb+srv://${process.env.INVENTORY_USER}:${process.env.INVENTORY_PASS}@cluster0.ecv1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const inventoryCollection = client.db('motoInventory').collection('Inventory');
        
        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        })

        app.get('/inventory/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const inventorys = await inventoryCollection.findOne(query);
            res.send(inventorys);
        })

    }
    finally{

    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log('Listening to port', port)
} );

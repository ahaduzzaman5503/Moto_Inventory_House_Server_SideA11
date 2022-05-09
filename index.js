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
    res.send("This is home place for and jo goom");
});
app.get('/cars', (req, res) => {
    res.send(cars);
});

app.get('/car/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const car = inventory.find(c => c.id === id);
    res.send(car);
    console.log(car)
});

app.post('/car', (req, res) =>{
    console.log( 'request', req.body);
    const car = req.body;
    car.id = inventory.length + 1;
    inventory.push(car);
    res.send(car);
});

app.listen(port, () => {
    console.log('Listening to port', port)
} );


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

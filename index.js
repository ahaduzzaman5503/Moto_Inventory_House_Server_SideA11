const express = require('express');
const cors = require('cors');
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
    const car = cars.find(c => c.id === id);
    res.send(car);
});

app.post('/car', (req, res) =>{
    console.log( 'request', req.body);
    const car = req.body;
    car.id = cars.length + 1;
    cars.push(car);
    res.send(car);
});

app.listen(port, () => {
    console.log('Listening to port', port)
} );

const cars = [
    { id: 0, name: "Jaguer M1 Hybrid", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-1.jpg",
        description: "Discover Jaguar's range of award-winning performance cars. All of our models use supreme technical innovation, design leadership and sporting prowess.",
        price: 16000, quantity: 307, supplierName: "James Dotson" },

    { id: 1, name: "Audi A8 Hybrid", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-2.jpg",
        description: "Audi has launched a hybrid version of the A8 saloon featuring a 2-litre TFSI petrol engine and electric assistance, claimed to be capable of 44.6mpg.",
        price: 18600, quantity: 217, supplierName: "Elizabeth Denis"},

    { id: 2,
        name: "Mercedez Benz E", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-3.jpg",
        description: "The Mercedes-Benz E-Class is a range of executive cars manufactured by German automaker Mercedes-Benz in various engine and body configurations.",
        price: 14900, quantity: 176, supplierName: "Jack Shull" },

    { id: 3, name: "Jaguer M1 Hybrid", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-4.jpg",
        description: "Discover Jaguar's range of award-winning performance cars. All of our models use supreme technical innovation, design leadership and sporting prowess.",
        price: 22500, quantity: 402, supplierName: "Edith Senn"},

    { id: 4, name: "Audi A8 Hybrid", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-5.jpg",
        description: "Audi has launched a hybrid version of the A8 saloon featuring a 2-litre TFSI petrol engine and electric assistance, claimed to be capable of 44.6mpg.",
        price: 15700, quantity: 325, supplierName: "Juan Edmonds" },

    { id: 5, name: "Bugatti Venon", carImage: "http://droitthemes.com/html/motodeal/img/product/car-collection/car-6.jpg",
        description: "The Bugatti Veyron EB 16.4 is a mid-engine sports car, designed and developed in France by the Volkswagen Group and Bugatti and manufactured in Molsheim",
        price: 20300, quantity: 274, supplierName: "Juan Edmonds" }
]


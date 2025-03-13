const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//DATABASE CONNECTION WITH MONGODB

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));


// API Creation

app.get("/", (req, res) => {
    res.send("Express app is Running...")
})

//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//Creating Upload endpoint 

app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})


//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})


app.post('/addproduct', async (req, res) => {

    const productData = req.body;
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: productData.name,
        image: productData.image,
        category: productData.category,
        new_price: productData.new_price,
        old_price: productData.old_price,
    })
    console.log('produuct : ', product)
    await product.save()
    console.log('saved.');

    res.json({
        success: true,
        name: productData.name,
    })
})


app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log('Removed the product');
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log('fetched all products');
    res.send(products);
})


app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server Running on Port ' + PORT);
    }
    else {
        console.log('Error: ' + error);
    }
})